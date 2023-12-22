import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
  const [persons, setPersons] = useState([{name:'Arto Hellas'}])
  const [newName, setNewName] = useState('')
  
  const handlePerson = (event) =>
  {
    event.preventDefault()
    const copy=[...persons]
    copy[persons.length]={name:newName}
    setPersons(copy)
    setNewName('')
  }
  const handleNameChange = (event) =>
  {
    event.preventDefault()
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePerson}>
        <div>
          name : <input 
          value={newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>)
      )}
    </div>
  )

}

export default App
