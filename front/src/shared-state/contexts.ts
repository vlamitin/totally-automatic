import React from 'react'
import { LoginStore } from './login-store'
import { TransactionsStore } from './transactions-store'

const createStores = () => ({
    loginStore: new LoginStore(),
    transactionsStore: new TransactionsStore(),
})

let storesContext: React.Context<any>

export function initStores(): void {
    storesContext = React.createContext(createStores())
}

export const useStores = () => React.useContext(storesContext)

window['storesContext'] = storesContext
