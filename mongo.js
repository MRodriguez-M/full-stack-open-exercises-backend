const mongoose = require('mongoose')

switch (true) {
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

const url = `mongodb+srv://melissarodriguezmurguia:${password}@cluster0.vlrwd1t.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

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
}