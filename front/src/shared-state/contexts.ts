import React from 'react'
import { LoginStore } from './login-store'

const createStores = () => ({
    loginStore: new LoginStore(),
})

const storesContext = React.createContext(createStores())

export const useStores = () => React.useContext(storesContext)

window['storesContext'] = storesContext
