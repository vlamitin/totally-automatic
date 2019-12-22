import React from 'react'
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { AddTransactions } from './pages/add-transactions/add-transactions'
import { Page } from './pages/page'
import { Login } from './pages/login/login'
import { observer } from 'mobx-react'
import { useStores } from './shared-state/contexts'
import { Nav } from './components/nav'

import './app.css'
import { Routes } from './routes'
import { ProcessTransactions } from './pages/process-transactions/process-transactions'

document.title = window.location.host

export const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Nav/>
                <Switch>
                    <Route exact path={Routes.ROOT}>
                        <span>home</span>
                    </Route>
                    <Route exact path={Routes.LOGIN}>
                        <Page>
                            <Login />
                        </Page>
                    </Route>
                    <PrivateRoute path={Routes.ADD_TRANSACTIONS}>
                        <Page>
                            <AddTransactions />
                        </Page>
                    </PrivateRoute>
                    <PrivateRoute path={Routes.PROCESS_TRANSACTIONS}>
                        <Page>
                            <ProcessTransactions />
                        </Page>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    )
}

interface PrivateRouteProps extends RouteProps {
    children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = observer(({ children, ...rest }) => {
    const { loginStore } = useStores()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                loginStore.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: Routes.LOGIN,
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
})
