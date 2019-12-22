import { action, observable } from 'mobx'

export interface Transaction {
    date: Date
    sum: number
    category: string
    comment?: string
}

export class TransactionsStore {
    @observable
    uncategorizedTransactions: Transaction[] = []

    @action
    setUncategorizedTransactions = uncategorizedTransactions => this.uncategorizedTransactions = uncategorizedTransactions
}
