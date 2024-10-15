import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthCtxProvider } from './store/auth-context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthCtxProvider>
    <App />
  </AuthCtxProvider>,
)
