import React from 'react'
import axios, { AxiosError } from 'axios'
import { get } from 'lodash'
import { useStores } from '../../shared-state/contexts'
import { observer } from 'mobx-react'
import { useHistory, useLocation } from 'react-router-dom'

interface LoginForm {
    username: string
    password: string
    scope: Scope[]
}

enum Scope {
    ME='me',
    READ_TRANSACTIONS='transactions:read',
    WRITE_TRANSACTIONS='transactions:write',
}

export const Login: React.FC<{}> = observer(() => {
    const [form, changeForm] = React.useState({
        username: '',
        password: '',
        scope: Object.keys(Scope).map(key => Scope[key])
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
                { Object.keys(Scope).map(key => Scope[key]).map(scopeItem => {
                    let id: string = scopeItem + '_checkbox'
                    return (
                        <div
                            style={{ marginBottom: 16 }}
                            key={id}
                        >
                            <input
                                id={id}
                                type="checkbox"
                                checked={form.scope.includes(scopeItem)}
                                onChange={e => {
                                    let newScopes = form.scope

                                    if (e.target.checked) {
                                        newScopes = newScopes.concat(scopeItem)
                                    } else {
                                        newScopes = newScopes.filter(s => s !== scopeItem)
                                    }

                                    changeForm({
                                        ...form,
                                        scope: newScopes
                                    })
                                }}
                            />
                            <label htmlFor={id}>{ scopeItem }</label>
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
    scope: boolean
}

function validateForm(form: LoginForm): ValidationResult {
    return {
        username: Boolean(form.username),
        password: Boolean(form.password),
        scope: form.scope.length > 0
    }
}

const encodeFormData = (form: LoginForm): string => {
    const data = {
        grant_type: 'password',
        ...form
    }

    return Object.keys(data)
        .map(key => {
            if (key === 'scope') {
                return encodeURIComponent(key) + '=' + data[key].map(encodeURIComponent).join('+')
            }

            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        })
        .join('&');
}
