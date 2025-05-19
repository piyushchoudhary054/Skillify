import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { ChallengesProvider } from './contexts/ChallengesContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChallengesProvider>
          <App />
        </ChallengesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)