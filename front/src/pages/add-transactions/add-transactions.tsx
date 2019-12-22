import React from 'react'
import { AddTransactionForm } from './add-transaction-form'
import { TransactionsList } from './transactions-list'

import './add-transactions.css'
import { useStores } from '../../shared-state/contexts'
import { Transaction } from '../../shared-state/transactions-store'

export interface AddTransactionsProps {
    transaction?: Transaction
    onTransactionAdded?: () => void
}

const defaultTransaction: Transaction = {
    date: undefined,
    sum: 0,
    category: '',
    comment: ''
}

export const AddTransactions: React.FC<AddTransactionsProps> = ({ transaction, onTransactionAdded }) => {
    const [transactions, changeTransactions] = React.useState([])
    const { loginStore } = useStores()

    // fetchTransactions()

    return (
        <div className="add-transactions">
            <AddTransactionForm
                key={transactions.length}
                defaultState={transaction || defaultTransaction}
                onStateChange={newTr => {
                    changeTransactions([...transactions, newTr])
                    if (onTransactionAdded) {
                        onTransactionAdded()
                    }
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
                        await sendTransactions(transactions, loginStore.token)
                        changeTransactions([])
                    }}>
                        send to spreadsheets (TODO)
                    </button>
                </div>
            </div>
        </div>
    )
}

async function fetchTransactions(): Promise<Transaction[]> {
    let response = await fetch('http://localhost:8000/transactions', {
        method: 'GET',
        mode: 'no-cors'
    })

    console.log(response)

    return []
}


async function sendTransactions(transactions: Transaction[], token: string): Promise<void> {
    let response = await fetch('http://localhost:8000/transactions', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transactions)
    })
}
