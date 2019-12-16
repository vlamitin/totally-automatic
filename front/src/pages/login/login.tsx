import React from 'react'
import axios, { AxiosError } from 'axios'
import { get } from 'lodash'
import { useStores } from '../../shared-state/contexts'
import { observer } from 'mobx-react'
import { useHistory, useLocation } from 'react-router-dom'

interface LoginForm {
    username: string
    password: string
    scopes: Scope[]
}

enum Scope {
    READ_TRANSACTIONS='transactions:read',
    WRITE_TRANSACTIONS='transactions:write',
}

export const Login: React.FC<{}> = observer(() => {
    const [form, changeForm] = React.useState({
        username: '',
        password: '',
        scopes: Object.keys(Scope).map(key => Scope[key])
    })

    const { loginStore } = useStores()
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    const validation = validateForm(form)
    const isValid = Object.keys(validation).every(key => validation[key] === true)

    const handleSubmit = async () => {
        if (!isValid) return
        const result = await submit(form)
        if ('isAxiosError' in result) {
            const message = get(result, 'response.data.detail') || result.message
            alert(message)
        } else {
            loginStore.setToken(result.access_token)
            history.replace(from)
        }
    }

    return (
        <div
            onKeyDown={event => {
                if (event.ctrlKey && event.keyCode === 13) {
                    handleSubmit()
                }
            }}
        >
            <div style={{ marginBottom: 16 }}>
                <input
                    id="username"
                    type="text"
                    value={form.username}
                    onChange={e => {
                        changeForm({
                            ...form,
                            username: e.target.value
                        })
                    }}
                />
                <label htmlFor="username">Login</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={e => {
                        changeForm({
                            ...form,
                            password: e.target.value
                        })
                    }}
                />
                <label htmlFor="password">Password</label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <p>Scopes</p>
                { Object.keys(Scope).map(key => Scope[key]).map(scope => {
                    let id: string = scope + '_checkbox'
                    return (
                        <div
                            style={{ marginBottom: 16 }}
                            key={id}
                        >
                            <input
                                id={id}
                                type="checkbox"
                                checked={form.scopes.includes(scope)}
                                onChange={e => {
                                    let newScopes = form.scopes

                                    if (e.target.checked) {
                                        newScopes = newScopes.concat(scope)
                                    } else {
                                        newScopes = newScopes.filter(s => s !== scope)
                                    }

                                    changeForm({
                                        ...form,
                                        scopes: newScopes
                                    })
                                }}
                            />
                            <label htmlFor={id}>{ scope }</label>
                        </div>
                    )
                }) }
            </div>
            <div>
                <button
                    disabled={!isValid}
                    onClick={handleSubmit}
                >
                    submit
                </button>
            </div>
        </div>
    )
})

interface LoginResult {
    access_token: string
    token_type: string
}

async function submit(form: LoginForm): Promise<LoginResult | AxiosError> {
    try {
        let response = await axios.request({
            url: 'http://localhost:8000/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: encodeFormData(form),
        })

        console.log(response)
        return response.data
    } catch (e) {
        console.error(e)
        if ('toJSON' in e) {
            console.log(e.toJSON())
        }

        if (e.isAxiosError) {
            return e
        }

        alert(e)
    }
}

interface ValidationResult {
    username: boolean
    password: boolean
    scopes: boolean
}

function validateForm(form: LoginForm): ValidationResult {
    return {
        username: Boolean(form.username),
        password: Boolean(form.password),
        scopes: form.scopes.length > 0
    }
}

const encodeFormData = (data: LoginForm): string => {
    return Object.keys(data)
        .map(key => {
            if (key === 'scopes') {
                return data[key].join(',')
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        })
        .join('&');
}
