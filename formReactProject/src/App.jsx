import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import axios from 'axios'
import Person from './components/phonebook'


const App = () => {
  const [persons,setPersons] = useState([])
  const [formArray,setformArray]=useState({'name':'','number':''})

  useEffect(()=>{
  const promise = axios.get('http://localhost:3001/phonebook')
    promise.then(response => {
      setPersons(response.data)
    })
  },[])

  const handleChange = (e) => {
    e.preventDefault()
    const phonebookObj = {
      id : persons.length + 1,
      name :formArray.name,
      number:formArray.number
    }
    axios.post("http://localhost:3001/phonebook",phonebookObj)
    .then(response=>setPersons(persons.concat(response.data)))
    setformArray({'name':'','number':''})
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
      {persons.map((data) => (
        <p key={data.id}>{data.id}  {data.name} :: {data.number}</p>)
      )}
    </div>
  )
}


export default App
