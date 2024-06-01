import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FundMeProvider } from './context/FundMeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FundMeProvider>
    <App />
    </FundMeProvider>
  </React.StrictMode>,
)
