"use client"

import Main from './pages/main'
import './style.scss'
import {BrowserRouter}  from 'react-router-dom'

export default function Home() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Main />  
      </BrowserRouter>
    </div>
  )
}
