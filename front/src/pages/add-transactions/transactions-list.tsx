import React from 'react'

import './added-transactions-list.css'
import { Transaction } from '../../shared-state/transactions-store'

interface TransactionsListProps {
    transactions: Transaction[]
    onRowDelete: (index: number) => void
}

export const TransactionsList: React.FC<TransactionsListProps> = props => {

    return (
        <table className="tr-list">
            <thead>
                <tr>
                    { ['Номер', 'Дата', 'Сумма', 'Категория', 'Комментарий', ''].map(header => (
                        <th key={header}>{ header }</th>
                    )) }
                </tr>
            </thead>
            <tbody>
                { props.transactions.map((tr, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{`${tr.date.getDate()}.${tr.date.getMonth() + 1}.${tr.date.getFullYear()}` }</td>
                        <td>{tr.sum}</td>
                        <td>{tr.category}</td>
                        <td>{tr.comment}</td>
                        <td><button onClick={() => {
                            props.onRowDelete(index)
                        }}>x</button></td>
                    </tr>
                )) }
            </tbody>
        </table>
    )
}
