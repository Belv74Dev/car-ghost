import React from 'react'
import ReactDOM from 'react-dom/client'
import { CarGhostPage } from './pages/car-ghost-page'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ height: '100px' }} />
    <CarGhostPage />
    <div style={{ height: '100px' }} />
  </React.StrictMode>,
)
