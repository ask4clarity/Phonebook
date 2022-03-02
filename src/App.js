import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Search from './components/Search'
import personService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSearch = (event) => setSearch(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      console.log(response)
      setPersons(response)
    })
  }, [])

  const addName = (event) => {

    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const nameEqual = persons.some(person => person.name === newName)
    const numberEqual = persons.some(person => person.number === newNumber)

    if (nameEqual) {
      const isReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (isReplace) {
        const person = persons.find(p => p.name === newName)
        personService
        .update(person.id, nameObject)
        .then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response))
          setNewName('') 
          setNewNumber('')
        })
      }
    }
    else if (newName === '' || newNumber === '') {
      alert('Please provide valid credentials to be added to phonebook')
    }
    else {
      personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('') 
        setNewNumber('') 
      })
    }
  }

  const removeUser = id => {
    const person = persons.find(p => p.id === id)
    const isDelete = window.confirm(`delete ${person.name}?`)
    if (isDelete) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const results = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Search</h2>
      <Search search={search} handlesearch={handleSearch}/>
      <h2>Phonebook</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} namechange={handleNameChange} numberchange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers list={results} remove={removeUser}/>
    </div>
  )
}

export default App