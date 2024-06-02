import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
import Card from './components/Card'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home/>
    <Card />
  </React.StrictMode>,
)
