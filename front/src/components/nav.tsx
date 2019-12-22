import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { useStores } from '../shared-state/contexts'
import { Routes } from '../routes'

import { Link, useLocation } from 'react-router-dom'
import './nav.css'

export const Nav: React.FC<{}> = observer(() => {
    const { loginStore } = useStores()
    const { pathname } = useLocation()

    return (
        <>
            <ul className="nav">
                <li className={classNames({
                    'active': pathname === Routes.ROOT
                })}>
                    <Link to={Routes.ROOT}>Home</Link>
                </li>
                <li className={classNames('second-last-item', {
                    'active': pathname === Routes.ADD_TRANSACTIONS
                })}>
                    <Link to={Routes.ADD_TRANSACTIONS}>Add-transactions</Link>
                </li>
                <li className={classNames({
                    'active': pathname === Routes.LOGIN
                })}>
                    { loginStore.isAuthenticated ? (
                        <Link
                            to={Routes.LOGIN}
                            onClick={() => {
                                loginStore.setToken('')
                            }}
                        >
                            { 'Logout' + (loginStore.username && ` (${loginStore.username})`) }
                        </Link>
                    ) : (
                        <Link to={Routes.LOGIN}>Login</Link>
                    )}
                </li>
            </ul>
            <hr />
        </>
    )
})
