import React from 'react'
import { useStores } from '../../shared-state/contexts'
import { AddTransactions } from '../add-transactions/add-transactions'
import { TransactionsList } from '../add-transactions/transactions-list'
import { observer } from 'mobx-react'
import { Transaction } from '../../protocol/transactions-service'

export const ProcessTransactions: React.FC<{}> = observer(() => {
    const { transactionsStore } = useStores()

    const [firstTransaction, ...otherTransactions] = transactionsStore.uncategorizedTransactions

    const rawTransactionsRef = React.useRef<HTMLTextAreaElement>()

    return (
        <div>
            <AddTransactions
                transaction={firstTransaction}
                onTransactionProcessed={() => {
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
            <br />
            <br />
            <div>
                <label htmlFor="rawTransactions">Paste raw transactions:</label>
                <textarea id="rawTransactions"
                          rows={5}
                          cols={33}
                          ref={rawTransactionsRef}
                />
                <br />
                <button onClick={() => {
                    try {
                        let userInput: any = eval(rawTransactionsRef.current.value)
                        let transactions: Transaction[] = userInput.map(tr => {
                            return {
                                ...tr,
                                date: new Date(tr.date)
                            }
                        })
                        transactionsStore.setUncategorizedTransactions(transactions)
                    } catch (e) {
                        console.error(e)
                        alert('bad transactions format!')
                    }
                }}>Set</button>
            </div>
        </div>
    )
})
