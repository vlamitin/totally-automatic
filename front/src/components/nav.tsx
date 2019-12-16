import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../shared-state/contexts'
import { Routes } from '../routes'

import { Link } from 'react-router-dom'
import './nav.css'

export const Nav: React.FC<{}> = observer(() => {
    const { loginStore } = useStores()

    return (
        <>
            <ul className="nav">
                <li>
                    <Link to={Routes.ROOT}>Home</Link>
                </li>
                <li className="second-last-item">
                    <Link to={Routes.ADD_TRANSACTIONS}>Add-transactions</Link>
                </li>
                <li>
                    { loginStore.isAuthenticated ? (
                        <Link to={Routes.LOGIN} onClick={() => loginStore.setToken('')}>Logout</Link>
                    ) : (
                        <Link to={Routes.LOGIN}>Login</Link>
                    )}
                </li>
            </ul>
            <hr />
        </>
    )
})
