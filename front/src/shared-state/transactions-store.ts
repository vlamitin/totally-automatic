import { action, observable } from 'mobx'
import { Transaction } from '../protocol/transactions-service'

export class TransactionsStore {
    @observable
    uncategorizedTransactions: Transaction[] = []

    @action
    setUncategorizedTransactions = uncategorizedTransactions => this.uncategorizedTransactions = uncategorizedTransactions
}
