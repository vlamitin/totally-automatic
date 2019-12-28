import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import { setServerUrl } from './protocol/services'
import { initStores } from './shared-state/contexts'

import './index.css'

setServerUrl('http://localhost:8000')
initStores()

document.title = window.location.host

ReactDOM.render(<App />, document.getElementById('root'))
