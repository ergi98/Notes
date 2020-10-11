import React from 'react'
import './App.css'

// Components
import Routes from './components/routes/Routes'

// Redux
import { Provider } from 'react-redux'

// Persistor
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistor, store } from './redux/store/store'

function App() {
  return (
    <Provider store= { store } >
      <PersistGate persistor={ persistor }>
        <Routes/>
      </PersistGate>
    </Provider>
  )
}

export default App
