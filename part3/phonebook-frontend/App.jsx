import { useEffect, useState } from 'react'
import contactService from './services/contacts'

const Filter = (props) => {
  return (
    <div>filter shown with <input onChange={props.handleFilter} value={props.filter}/></div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addContact}>
        <div>name: <input onChange={props.handleContactName} value={props.newName}/></div>
        <div>number: <input onChange={props.handleContactNumber} value={props.newNumber}/></div>
        <div>
          <button type='submit'>add</button>
        </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
      {(props.filter.length > 0)
      ? props.filterList.map(person => 
        <div>
          <p key={person.id}>{person.name} {person.number}</p>
          <button>delete</button>
        </div>)
      : props.persons.map(person => 
        <div>
          <p key={person.id}>{person.name} {person.number}</p>
          <button onClick={() => props.deleteContactInfo(person.id, person.name)}>delete</button>
        </div>)}
    </div>
  )
}

const SuccessNotification = (props) => {
  if(props.message === null) {
    return null
  }

  return(
    <div className='success'>{props.message}</div>
  )
}

const ErrorNotification = (props) => {
  if(props.message === null) {
    return null
  }

  return(
    <div className='error'>{props.message}</div>
  )
}

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); 

  const addContact = (event) => {
    event.preventDefault();
    const contactObj = {
      name: newName,
      number: newNumber,
    }

    for(let i = 0; i < persons.length; i++) {
      if(contactObj.name === persons[i].name) {
        if(confirm(`${persons[i].name} is already added to phonebook, replace the old number with a new one?`)) {
          updateContactNumber(persons[i].id, contactObj.number);
        }
        break;
      }
      if(i === persons.length-1 && contactObj.name !== persons[i].name) {
        contactService
          .create(contactObj)
          .then(returnedContact => {
            setPersons(persons.concat(returnedContact))
            setSuccessMessage(`Added ${returnedContact.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          })
          .catch(error => {
            if(contactObj.name.length <= 2) {
              setErrorMessage(`Person validation failed: name: Path \`name\` (\`${contactObj.name}\`) is shorter than the minimum allowed length (3).`);
            }
            else {
              setErrorMessage("Failed to add contact");
            }
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          })
      }
    }

    setNewName('');
    setNewNumber('');
  }

  const deleteContactInfo = (contactId, contactName) => {
    if(confirm(`Delete ${contactName} ?`)) {
      contactService
        .deleteContact(contactId)
        .then(() => getContactInfo())
    }
  }
  
  const getContactInfo = () => {
    contactService
      .read()
      .then(contacts => {
        setPersons(contacts);
      })
  }

  const updateContactNumber = (contactId, newNumber) => {
    const contact = persons.find(person => person.id === contactId);
    const changedNumber = { ...contact, number: newNumber };

    contactService
      .update(contactId, changedNumber)
      .then(returnedContact => {
        setPersons(persons.map(person => person.id !== contactId ? person : returnedContact))
        setSuccessMessage(`Changed ${changedNumber.name}'s number`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
      })
      .catch(error => {
        setErrorMessage(`Information of ${changedNumber.name} has already been removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
      })
  }

  const handleContactName = (event) => {
    setNewName(event.target.value);
  }

  const handleContactNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }
  
  useEffect(() => {
    const tempArr = persons.filter(val => val.name.toLowerCase().includes(filter.toLowerCase()));
    setFilterList(tempArr);
  }, [filter])

  useEffect(() => {
    getContactInfo();
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter handleFilter={handleFilter} filter={filter}/>
      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        handleContactName={handleContactName}   
        newName={newName}
        handleContactNumber={handleContactNumber}
        newNumber={newNumber}  
      />
      <h2>Numbers</h2>
      <Persons
        filter={filter}
        filterList={filterList}
        persons={persons}
        deleteContactInfo={deleteContactInfo}
      />
    </div>
  )
}

export default App
