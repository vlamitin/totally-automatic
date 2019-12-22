import { action, autorun, computed, observable } from 'mobx'

export class LoginStore {
    @observable
    token: string = ''

    @observable
    username: string = ''

    constructor() {
        autorun(() => {
            if (this.token) {
                this.fetchUsername()
            }
        })

        if (!this.token) {
            this.setToken(localStorage.getItem('token') || '')
        }
    }

    fetchUsername = async () => {
        const response = await fetch('http://localhost:8000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })

        const jsoned = await response.json()

        if (jsoned.username) {
            this.setUsername(jsoned.username)
        }
    }

    @computed
    get isAuthenticated(): boolean {
        return Boolean(this.token)
    }

    @action
    setUsername = username => this.username = username

    @action
    setToken = token => {
        this.token = token
        localStorage.setItem('token', token)
    }
}
