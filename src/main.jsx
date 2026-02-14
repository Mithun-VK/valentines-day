import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './app'
import YesPage from './yes_page'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/yes" element={<YesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
