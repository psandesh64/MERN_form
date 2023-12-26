import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import './App.css'

const App = () => {
  const  promise = axios.get('http://localhost:3001/notes')
  console.log(promise)
  return <h1>axios</h1>
}


export default App
