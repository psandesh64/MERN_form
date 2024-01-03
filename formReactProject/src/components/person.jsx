import axios from 'axios'
const Person =({person}) =>{
    const handleDelete = () => {
        axios.delete(`http://localhost:3001/phonebook/${person.id}`)
          .then(response => {
            console.log(response.data);
          })
      };
    return <div>
        <p>{person.id} {person.name}  {person.number}</p>
        <button onClick={handleDelete}>Delete</button>
    </div>
}
export default Person 