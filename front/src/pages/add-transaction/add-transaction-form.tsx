import React from 'react'
import { DayPicker } from '../../components/day-picker'
import { AutoComplete } from '../../components/auto-complete'

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

export interface Transaction {
    date: Date
    sum: number
    category: string
    comment?: string
}

export interface AddTransactionFormProps {
    defaultState: Transaction
    onStateChange: (newState: Transaction) => void
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
                    props.onStateChange(form)
                }
            }}
        >
            <div style={{ marginBottom: 16 }}>
                <DayPicker
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
                    onChange={e => changeForm({
                        ...form,
                        sum: Number(e.target.value)
                    })}
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
                    onChange={e => changeForm({
                        ...form,
                        comment: e.target.value
                    })}
                />
                <label htmlFor="tr-comment">Комментарий</label>
            </div>
            <div>
                <button
                    disabled={!isValid}
                    onClick={() => {
                        props.onStateChange(form)
                    }}
                >
                    submit
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
