import React from 'react'
import { LoginStore } from './login-store'
import { TransactionsStore } from './transactions-store'

export class StoresRepository {
    static instance: StoresRepository

    constructor(
        public loginStore: LoginStore,
        public transactionsStore: TransactionsStore
    ) {}
}

let storesContext: React.Context<StoresRepository>

export function initStores(): void {
    StoresRepository.instance = new StoresRepository(
        new LoginStore(),
        new TransactionsStore()
    )
    storesContext = React.createContext(StoresRepository.instance)
    window['storesRepository'] = StoresRepository.instance
}

export const useStores = () => React.useContext(storesContext)
