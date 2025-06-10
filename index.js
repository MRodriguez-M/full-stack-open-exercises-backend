require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.static('dist'))
const PORT = process.env.PORT;
const morgan = require('morgan');
const Contact = require('./models/contact');

/*switch (true) {
  case (process.argv.length < 3):
    console.log('Missing password as argument')
    process.exit(1)
  case (process.argv.length === 4):
    console.log('Missing argument')
    process.exit(1)
  case (process.argv.length > 5):
    console.log('Too many arguments')
    process.exit(1)
  default:
    break
}

const password = process.argv[2]

if (process.argv.length === 3) {
  Contact.find({}).then(result => {
  console.log('phonebook:')
  result.forEach(contact => {
    console.log(contact.name, contact.number)
  })
  mongoose.connection.close()
  })
}
else if (process.argv.length === 5) {
  const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
  })

  contact.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}*/

morgan.token('data', (req, res) => {
  return JSON.stringify(req.body);
});
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get ('/api/persons/:id', (request, response) => {
    const contactId = request.params.id;
    const person = persons.find(person => person.id === contactId);

    if(person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => console.log(error))
})

app.get('/info', (request, response) => {
    let requestDate = new Date();
    response.send(`Phonebook has info for ${persons.length} people <br> ${requestDate}`)
})

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'name and/or number missing'
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  /*for(let i = 0; i < persons.length; i++) {
    if(person.name === persons[i].name) {
      return response.status(400).json({
        error: 'name already exists'
      })
    }
  }*/

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})