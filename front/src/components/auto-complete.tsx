import React from 'react'
import Autosuggest from 'react-autosuggest'
import { CATEGORIES } from '../pages/add-transactions/add-transaction-form'

import './auto-complete.css'

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    const filtered = inputLength === 0 ? CATEGORIES : CATEGORIES.filter(val =>
        val.toLowerCase().slice(0, inputLength) === inputValue
    )

    if (filtered.length === 1 && value === filtered[0]) {
        return []
    }
    return filtered
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
)

interface AutoCompleteProps {
    defaultValue: string
    onSuggestionSelect: (newValue: string) => void
}

interface AutoCompleteState {
    value: string
    suggestions: string[]
}

export class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    state: AutoCompleteState = {
        value: this.props.defaultValue,
        suggestions: []
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        })
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        })
    }

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    render() {
        const { value, suggestions } = this.state

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Категория',
            value,
            onChange: this.onChange
        }

        // Finally, render it!
        return (
            <div onFocus={() => {
                if (!value) {
                    this.onSuggestionsFetchRequested({ value: '' })
                }
            }}>
                <Autosuggest<string>
                    suggestions={suggestions}
                    alwaysRenderSuggestions
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={(event, data) => {
                        this.props.onSuggestionSelect(data.suggestionValue)
                    }}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        )
    }
}
