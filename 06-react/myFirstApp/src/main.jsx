import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ApplicationContext } from './Contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApplicationContext>
  </StrictMode>,
)
