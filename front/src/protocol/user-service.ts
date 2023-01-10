import { BaseHttpService, GET, MethodMiddlewares, POST } from './base-http-service'
import { getService, service } from './services'

export interface User {
    username: string
    allowed_scopes: string[]
    disabled: boolean
    email?: string
    full_name?: string
}

export interface LoginResult {
    access_token: string
    token_type: string
}

export enum Scope {
    ME='me',
    READ_TRANSACTIONS='transactions:read',
    WRITE_TRANSACTIONS='transactions:write',
}

export interface LoginForm {
    username: string
    password: string
    scope: Scope[]
}

@service
export class UserService extends BaseHttpService {

    static serviceName: string = 'UserService'
    static get instance(): UserService {
        return getService<UserService>(UserService.serviceName)
    }

    getMe = (token: string, methodMiddlewares: MethodMiddlewares = {}) => {
        return super.send<User>({
            url: '/users/me',
            method: GET,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }, methodMiddlewares)
    }

    login = async (form: LoginForm, methodMiddlewares: MethodMiddlewares = {}) => {
        return super.send<LoginResult>({
            url: '/login',
            method: POST,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: encodeFormData(form),
        }, methodMiddlewares)
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
