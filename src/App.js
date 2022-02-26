import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSearch = (event) => setSearch(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already in use`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('') 
      setNewNumber('') 
    }
  }
  const searchResults = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Search</h2>
      <Search search={search} handlesearch={handleSearch}/>
      <h2>Phonebook</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} namechange={handleNameChange} numberchange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers list={searchResults}/>
    </div>
  )
}

export default App