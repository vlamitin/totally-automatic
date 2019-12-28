import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import { setServerUrl } from './protocol/services'
import { initStores, StoresRepository, useStores } from './shared-state/contexts'

import './index.css'
import { BaseHttpService } from './protocol/base-http-service'
import { AxiosError } from 'axios'

BaseHttpService.commonErrorMiddlewares.push((error: AxiosError) => {
    if (error.response.status === 401) {
        const { loginStore } = StoresRepository.instance
        loginStore.setToken('')
    }
})

setServerUrl('http://localhost:8000')
initStores()

document.title = window.location.host

ReactDOM.render(<App />, document.getElementById('root'))
