/*
  Bases de Datos I - Verano 2025-2026
  Proyecto 2 - Gestión Hotelera
  
  Integrantes:
  Samuel Garcés Castillo - 2022129139
  Noé López Durón - 2024234500

*/

//Para correr la pagina poner en terminal: npm run dev

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
