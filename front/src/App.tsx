import React from 'react'
import './App.css'
import { AddTransactionForm } from './pages/add-transaction/add-transaction-form'
import { AddedTransactionsList } from './pages/add-transaction/added-transactions-list'

const App: React.FC = () => {
    const [transactions, changeTransactions] = React.useState([])
    return (
        <div className="app">
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
                        let response = await fetch('http://localhost:3003/api', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({
                                transactions
                            }),
                            mode: 'no-cors'
                        });

                    }}>send to spreadsheets (TODO)</button>
                </div>
            </div>
        </div>
    )
}

export default App
