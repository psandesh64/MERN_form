import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Person from './components/person'
import phonebook_ser from './services/phonebook'


const App = () => {
  const [persons,setPersons] = useState([])
  const [formArray,setformArray]=useState({'name':'','number':''})

  useEffect(()=>{
    phonebook_ser.getAll().then(response => {
      setPersons(response.data)
    })
  },[])
  const handleChange = (e) => {
    e.preventDefault();

    let newId = persons.length > 0 ? persons[persons.length - 1].id + 1 : 1;
  
    const phonebookObj = {
      id: newId,
      name: formArray.name,
      number: formArray.number
    }
  
    let foundPerson = false;
  
    persons.forEach(person => {
      if (person.name === phonebookObj.name) {
        newId = person.id;
        foundPerson = true;
      }
    });
  
    if (!foundPerson) {
      phonebook_ser.create(phonebookObj)
        .then(response => setPersons(persons.concat(response.data)));
    } else {
      phonebook_ser.update(newId, phonebookObj)
        .then(response => setPersons(persons.map(person => (person.id === newId ? response.data : person))));
    }
  
    setformArray({ 'name': '', 'number': '' });
  }

  const handleDelete = (id) => {
    window.confirm("Do you want to delete this ") ?
    phonebook_ser.clean(id)
    .then((response) => setPersons(persons.filter(person => person.id !== id)))
    :console.log("Delete operation cancelled")
  }

  return (
    <div>
      <form onSubmit={handleChange}>
        <label>Name : </label>
        <input onChange={(event)=>setformArray({...formArray,'name':event.target.value})} value={formArray.name}/><br/><br/>
        <label>Number : </label>
        <input onChange={(event)=>setformArray({...formArray,'number':event.target.value})} value={formArray.number}/>
        <button>Add</button>
        <br/><br/>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.id} person={person} handleDeleteOf={()=>handleDelete(person.id)}/> )}
    
    </div>
  )
}


export default App
