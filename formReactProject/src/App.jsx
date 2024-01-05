import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Person from './components/person'
import phonebook_ser from './services/phonebook'
import NotificationMsg from './components/notificationmsg'


const App = () => {
  const [persons,setPersons] = useState([])
  const [formArray,setformArray]=useState({'name':'','number':''})
  const [notification,setNotification] = useState({status:'',css:'success'})
  

  useEffect(()=>{
    phonebook_ser.getAll().then(response => {
      setPersons(response.data)
    })
    .catch(error=>console.log('error fetching file'))
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
        .then(response => setPersons(persons.concat(response.data)))
        .catch(error=>console.log('error creating file'));
        setNotification({status:'Created Successfully',css:'success'});
        setTimeout(()=>setNotification(''),2000);
    } else {
      phonebook_ser.update(newId, phonebookObj)
        .then(response => setPersons(persons.map(person => (person.id === newId ? response.data : person))))
        .catch(error=>console.log('error updating file'));;
        setNotification({status:'Updated Successfully',css:'updated'});
        setTimeout(()=>setNotification(''),2000);
    }
  
    setformArray({ 'name': '', 'number': '' });
  }

  const handleDelete = (id) => {
    let d=window.confirm("Do you want to delete this ")
    if (d) {phonebook_ser.clean(id)
    .then((response) => setPersons(persons.filter(person => person.id !== id)))
    .catch(error=>console.log('error deleting file'));
    setNotification({status:'Deleted Successfully',css:'deleted'});
    setTimeout(()=>setNotification(''),2000);
  }
    else {console.log("Delete operation cancelled")}
  }

  return (
    <div>
      <form onSubmit={handleChange}>
        <NotificationMsg noti={notification}/>
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
