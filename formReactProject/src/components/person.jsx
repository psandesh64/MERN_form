const Person =({person,handleDeleteOf}) =>{
    
    return <div>
        <p>{person.id} {person.name}  {person.number}</p>
        <button onClick={handleDeleteOf}>Delete</button>
    </div>
}
export default Person 