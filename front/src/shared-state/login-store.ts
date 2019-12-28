import { action, autorun, computed, observable } from 'mobx'
import { User, UserService } from '../protocol/user-service'

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
        const user: User =  await UserService.instance.getMe(this.token)

        if (user.username) {
            this.setUsername(user.username)
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
