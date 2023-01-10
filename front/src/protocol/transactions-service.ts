import { BaseHttpService, GET, MethodMiddlewares, PUT } from './base-http-service'
import { getService, service } from './services'

export interface Transaction {
    date: Date
    sum: number
    category: string
    comment?: string
}

@service
export class TransactionsService extends BaseHttpService {

    static serviceName: string = 'TransactionsService'
    static get instance(): TransactionsService {
        return getService<TransactionsService>(TransactionsService.serviceName)
    }

    sendTransactions = (transactions: Transaction[], token: string, methodMiddlewares: MethodMiddlewares = {}) => {
        return super.send<Transaction[]>({
            url: '/transactions',
            method: PUT,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: transactions
        }, methodMiddlewares)
    }
}
