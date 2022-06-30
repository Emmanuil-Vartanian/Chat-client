import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store from 'store'
import Router from 'router'

const App: React.FC = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <div className="App">
          <Router />
        </div>
      </PersistGate>
    </Provider>
  )
}

export default App
