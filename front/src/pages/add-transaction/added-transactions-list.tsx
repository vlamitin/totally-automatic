import React from 'react'
import { Transaction } from './add-transaction-form'

import './added-transactions-list.css'

interface AddedTransactionsListProps {
    transactions: Transaction[]
    onRowDelete: (index: number) => void
}

export const AddedTransactionsList: React.FC<AddedTransactionsListProps> = props => {

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
