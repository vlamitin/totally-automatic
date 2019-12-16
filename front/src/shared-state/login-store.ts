import { action, computed, observable } from 'mobx'

export class LoginStore {
    @observable
    token: string = ''

    constructor() {
        if (!this.token) {
            this.setToken(localStorage.getItem('token') || '')
        }
    }

    @computed
    get isAuthenticated(): boolean {
        return Boolean(this.token)
    }

    @action
    setToken = token => {
        this.token = token
        localStorage.setItem('token', token)
    }
}
