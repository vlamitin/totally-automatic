import React from 'react'
import { AddTransactionForm, Transaction } from './add-transaction-form'
import { AddedTransactionsList } from './added-transactions-list'

import './add-transactions.css'
import { useStores } from '../../shared-state/contexts'

export const AddTransactions: React.FC = () => {
    const [transactions, changeTransactions] = React.useState([])
    const { loginStore } = useStores()

    // fetchTransactions()

    return (
        <div className="add-transactions">
            <AddTransactionForm
                key={transactions.length}
                defaultState={{
                    date: undefined,
                    sum: 0,
                    category: '',
                    comment: ''
                }}
                onStateChange={newTr => {
                    changeTransactions([...transactions, newTr])
                }}
            />
            <div>
                <AddedTransactionsList
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
