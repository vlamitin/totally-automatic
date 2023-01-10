import React from 'react'
import { get } from 'lodash'
import { useStores } from '../../shared-state/contexts'
import { observer } from 'mobx-react'
import { useHistory, useLocation } from 'react-router-dom'
import { LoginForm, Scope, UserService } from '../../protocol/user-service'
import { AxiosError } from 'axios'

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
        const result = await UserService.instance.login(form, {
            errorMiddlewares: [
                (error: AxiosError) => {
                    const message = get(error, 'response.data.detail') || error.message
                    alert(message)
                }
            ]
        })

        if (result) {
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
