import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response)
      setPersons(response.data)
    })
  }, [])
  
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