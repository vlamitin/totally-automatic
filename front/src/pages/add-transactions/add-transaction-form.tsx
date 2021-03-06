import React from 'react'
import { DayPicker } from '../../components/day-picker'
import { AutoComplete } from '../../components/auto-complete'
import { Transaction } from '../../protocol/transactions-service'

export const CATEGORIES = [
    'Еда работа',
    'Еда магазы',
    'Прочее',
    'Еда заказ/кафе',
    'Проезд',
    'Медицина',
    'Одежда',
    'Покупки в кв',
    'Зубы',
    'Химия',
    'Инет, телефоны',
    'Ремонт',
    'КУ',
    'Кошка',
    'Ипотека',
    'Инет+тел',
    'Машина',
    'Квартира',
    'Кем. КУ',
    'Саморазв',
    'Отпуск',
]

export interface AddTransactionFormProps {
    defaultState: Transaction
    onSubmit: (newState: Transaction) => void
    onClear?: () => void
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = props => {
    const [form, changeForm] = React.useState(props.defaultState)

    const validation = validateForm(form)
    const isValid = Object.keys(validation).every(key => validation[key] === true)

    return (
        <div
            onKeyDown={event => {
                if (event.ctrlKey && event.keyCode === 13) {
                    if (!isValid) return
                    props.onSubmit(form)
                }
            }}
        >
            <div style={{ marginBottom: 16 }}>
                <DayPicker
                    defaultDate={form.date}
                    onDateChange={newDate => changeForm({
                        ...form,
                        date: newDate
                    })}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <input
                    id="tr-sum"
                    type="text"
                    value={form.sum}
                    onChange={e => {
                        if (isNaN(Number(e.target.value))) {
                            return
                        }

                        changeForm({
                            ...form,
                            sum: Number(e.target.value)
                        })
                    }}
                />
                <label htmlFor="tr-sum">Сумма</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <AutoComplete
                    defaultValue={form.category}
                    onSuggestionSelect={newValue => {
                        changeForm({
                            ...form,
                            category: newValue
                        })
                    }}
                />
            </div>
            <div style={{ marginBottom: 16 }}>
                <input
                    id="tr-comment"
                    type="text"
                    value={form.comment}
                    onChange={e => {
                        console.log(e.target.value)
                        changeForm({
                            ...form,
                            comment: e.target.value
                        })
                    }}
                />
                <label htmlFor="tr-comment">Комментарий</label>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <button
                    disabled={!isValid}
                    onClick={() => {
                        props.onSubmit(form)
                    }}
                >
                    submit
                </button>
                <button
                    onClick={() => {
                        changeForm(props.defaultState)
                        props.onClear && props.onClear()
                    }}
                >
                    clear
                </button>
            </div>
        </div>
    )
}

interface ValidationResult {
    date: boolean
    sum: boolean
    category: boolean
    comment: boolean
}

function validateForm(form: Transaction): ValidationResult {
    return {
        date: Boolean(form.date),
        sum: Boolean(form.sum),
        category: Boolean(form.category) && CATEGORIES.includes(form.category),
        comment: true
    }
}
