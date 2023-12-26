import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import axios from axios

const App = () => {

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(response => {
    console.log(response)
  })
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((response) => (
        <p key={response.data.id}>{response.data.name}</p>)
      )}
    </div>
  )
}


export default App
