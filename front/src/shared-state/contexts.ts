import React from 'react'
import { LoginStore } from './login-store'
import { TransactionsStore } from './transactions-store'

const createStores = () => ({
    loginStore: new LoginStore(),
    transactionsStore: new TransactionsStore(),
})

const storesContext = React.createContext(createStores())

export const useStores = () => React.useContext(storesContext)

window['storesContext'] = storesContext
