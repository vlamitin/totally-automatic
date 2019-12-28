import { BaseHttpService, GET } from './base-http-service'
import { getService, service } from './services'

export interface User {
    username: string
    allowed_scopes: string[]
    disabled: boolean
    email?: string
    full_name?: string
}

@service
export class UserService extends BaseHttpService {

    static serviceName: string = 'UserService'
    static get instance(): UserService {
        return getService<UserService>(UserService.serviceName)
    }

    getMe = (token: string): Promise<User> => {
        return super.send<User>({
            url: '/users/me',
            method: GET,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
    }
}
