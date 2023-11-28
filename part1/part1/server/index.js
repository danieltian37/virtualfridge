require('dotenv').config()
const http = require('http')

const express = require('express')
const app = express()

const mongoose = require('mongoose')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.set('strictQuery',false)
mongoose.connect(uri)

const itemSchema = new mongoose.Schema({
    name: String,
    expDate: String,
    image: String,
})
itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Item = mongoose.model('Item', itemSchema)


let items = [
    {}
]

app.use(express.json())

app.get('/api/items', (request, response) => {
  Item.find({}).then(items => {
    response.json(items)
  })
})

app.post('/api/items', (request, response) => {
  const item = request.body
  console.log(item)
  response.json(item)
  items.push(item)
})


app.delete('/api/items/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})