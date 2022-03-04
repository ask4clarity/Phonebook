import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Search from './components/Search'
import Notification from './components/Notification'
import personService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

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
          setMessage('Updated succesfully')
          setTimeout(() => {
          setMessage(null);
          }, 5000)
        })
        .catch(error => {
          console.log(error)
          setMessage('User already deleted')
          setTimeout(() => {
            setMessage(null);
          }, 5000)
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
        setMessage('Added succesfully')
        setTimeout(() => {
          setMessage(null);
        }, 5000)
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
        setMessage('Deleted succesfully')
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        setMessage(`User already deleted`)
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      })
    }
  }

  const results = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Notification message={message}/>
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