import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { CarGhost } from './features/car-ghost'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ height: '100px' }} />
    <CarGhost />
    <div style={{ height: '100px' }} />
  </React.StrictMode>,
)
