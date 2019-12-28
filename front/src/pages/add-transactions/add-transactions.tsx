import React from 'react'
import { AddTransactionForm } from './add-transaction-form'
import { TransactionsList } from './transactions-list'
import { useStores } from '../../shared-state/contexts'
import { Transaction, TransactionsService } from '../../protocol/transactions-service'

import './add-transactions.css'

export interface AddTransactionsProps {
    transaction?: Transaction
    onTransactionProcessed?: () => void
}

const defaultTransaction: Transaction = {
    date: undefined,
    sum: 0,
    category: '',
    comment: ''
}

export const AddTransactions: React.FC<AddTransactionsProps> = ({ transaction, onTransactionProcessed }) => {
    const [transactions, changeTransactions] = React.useState([])
    const { loginStore } = useStores()

    return (
        <div className="add-transactions">
            <AddTransactionForm
                key={transactions.length + JSON.stringify(transaction || defaultTransaction)}
                defaultState={transaction || defaultTransaction}
                onSubmit={newTr => {
                    if (newTr) {
                        changeTransactions([...transactions, newTr])
                    }
                    if (onTransactionProcessed) {
                        onTransactionProcessed()
                    }
                }}
                onClear={() => {
                    onTransactionProcessed()
                }}
            />
            <div>
                <TransactionsList
                    transactions={transactions}
                    onRowDelete={index => {
                        changeTransactions(transactions.filter((tr, ind) => ind !== index))
                    }}
                />

                <div style={{ marginTop: 16 }}>
                    <button onClick={async () => {
                        await TransactionsService.instance.sendTransactions(transactions, loginStore.token)
                        changeTransactions([])
                    }}>
                        send to spreadsheets (TODO)
                    </button>
                </div>
            </div>
        </div>
    )
}
