import React from 'react'
import { useStores } from '../../shared-state/contexts'
import { AddTransactionForm } from '../add-transactions/add-transaction-form'
import { AddTransactions } from '../add-transactions/add-transactions'
import { TransactionsList } from '../add-transactions/transactions-list'
import { observer } from 'mobx-react'

export const ProcessTransactions: React.FC<{}> = observer(() => {
    const { transactionsStore } = useStores()

    const [firstTransaction, ...otherTransactions] = transactionsStore.uncategorizedTransactions

    return (
        <div>
            <AddTransactions
                transaction={firstTransaction}
                onTransactionAdded={() => {
                    transactionsStore.setUncategorizedTransactions(otherTransactions)
                }}
            />
            <hr/>
            <TransactionsList
                transactions={otherTransactions}
                onRowDelete={index => {
                    const newTr = [
                        firstTransaction,
                        ...otherTransactions.filter((tr, i) => i !== index)
                    ]

                    console.log(newTr)
                    transactionsStore.setUncategorizedTransactions(newTr)
                }}
            />
        </div>
    )
})
