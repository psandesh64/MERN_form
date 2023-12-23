import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
  const [persons, setPersons] = useState([{name:'Arto Hellas',id:0}])
  const [newName, setNewName] = useState('')
  
  const handlePerson = (event) =>  {
    event.preventDefault()
    
    setPersons(persons.concat({name:newName,id:persons[persons.length-1].id+1}))
    setNewName('')
  }
  const handleNameChange = (event) =>  {
      setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePerson}>
        <div>
          Name :  <input
            value={newName}
            onChange={handleNameChange}
          />
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>{person.name}</p>)
      )} 
    </div>
  )

}

export default App
