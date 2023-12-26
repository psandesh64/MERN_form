import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '9841388801', id: 0 },
    { name: 'Grivans Maddox', number: '9832658596', id: 1 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const searchPhonebook = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePerson = (event) => {
    event.preventDefault();

    const isNamePresent = persons.some((person) => person.name === newName);

    if (isNamePresent) {
      alert('Name already exists in the phonebook!');
    } else {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length }
      ]);
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with: <input onChange={searchPhonebook} value={searchTerm} />

      <form onSubmit={handlePerson}>
        <div>
          Name :{' '}
          <input value={newName} onChange={handleNameChange} />
          Number :{' '}
          <input value={newNumber} onChange={handleNumberChange} />
          <button type='submit'>Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
