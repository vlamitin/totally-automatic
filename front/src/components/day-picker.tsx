import React from 'react'
import { DayPickerInputProps } from 'react-day-picker'
import DayPickerInput from 'react-day-picker/DayPickerInput'

import moment from 'moment'

import 'moment/locale/ru'
import 'react-day-picker/lib/style.css'

moment.locale('ru')

const utils = require('react-day-picker/utils')

export interface DayPickerProps extends Omit<DayPickerInputProps, 'onDayChange'> {
    onDateChange: (newDate: Date) => void
}

export class DayPicker extends React.Component<DayPickerProps, { date: Date }> {

    state = {
        date: undefined
    }

    currentDay = undefined

    render() {
        return (
            <div onBlur={() => {
                this.setState({
                    date: this.currentDay
                })
                this.props.onDateChange(this.currentDay)
            }}>
                <p>Please type a day:</p>
                <DayPickerInput
                    format={'DD.MM.YYYY'}
                    placeholder={'DD.MM.YYYY'}
                    value={this.state.date}
                    onDayChange={(day, dayModifiers, dayPickerInput) => {
                        this.currentDay = day
                    }}
                    formatDate={(value, format, locale) => {
                        return moment(value).format(format)
                    }}
                    parseDate={(value, format, locale) => {
                        const newDate = moment(value, format)
                        if (newDate.isValid()) {
                            return newDate.toDate()
                        }
                        return undefined
                    }}
                    {...this.props}
                />
            </div>
        )
    }
}
