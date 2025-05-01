import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store.js'
import { LoadingBarContainer } from 'react-top-loading-bar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <LoadingBarContainer>
        <App />
      </LoadingBarContainer>
    </Provider>
  </StrictMode>
)
