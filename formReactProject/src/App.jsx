import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'

const App = () => {
  const [persons,setPersons] = useState([])

  useEffect(()=>{
  const promise = axios.get('http://localhost:3001/phonebook')
    promise.then(response => {
      setPersons(response.data)
    })
  },[])
 
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((data) => (
        <p key={data.id}>{data.id}  {data.name} :: {data.number}</p>)
      )}
    </div>
  )
}


export default App
