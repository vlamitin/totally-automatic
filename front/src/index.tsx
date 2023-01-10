import React from 'react'
import ReactDOM from 'react-dom'
import { get } from 'lodash'
import { App } from './app'
import { setServerUrl } from './protocol/services'
import { initStores, StoresRepository } from './shared-state/contexts'

import './index.css'
import { BaseHttpService } from './protocol/base-http-service'
import { AxiosError } from 'axios'

BaseHttpService.commonErrorMiddlewares.push((error: AxiosError) => {
    if (get(error, 'response.status') === 401) {
        const { loginStore } = StoresRepository.instance
        loginStore.setToken('')
    }
})

BaseHttpService.commonErrorMiddlewares.push((error: AxiosError | any) => {
    if ('toJSON' in error) {
        console.log('Axios error JSONed:', error.toJSON())
    }
})

setServerUrl('http://localhost:8000')
initStores()

document.title = window.location.host

ReactDOM.render(<App />, document.getElementById('root'))
