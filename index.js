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

morgan.token('data', (req) => {
  return JSON.stringify(req.body);
});
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get ('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
      .then(contact => {
        if (contact) {
          response.json(contact)
        }
        else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

app.get('/info', (request, response) => {
    let requestDate = new Date();

    Contact.countDocuments({})
      .then(count => {
        response.send(`Phonebook has info for ${count} people <br> ${requestDate}`)
      })
})

app.post('/api/persons', (request, response, next) => {
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

  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  Contact.findById(request.params.id)
    .then(result => {
      if (!result) {
        return response.status(404).end()
      }

      result.name = body.name;
      result.number = body.number;

      return result.save().then((updatedContact) => {
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})