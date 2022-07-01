import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'
import NavigateSetter from 'components/Navigation'

const rootEl = document.getElementById('root')
const root = createRoot(rootEl)

root.render(
  <BrowserRouter>
    <NavigateSetter />
    <App />
  </BrowserRouter>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    root.render(<NextApp />)
  })
}
