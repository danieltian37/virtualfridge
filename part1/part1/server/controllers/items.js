const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const itemsRouter = require('express').Router()
const users = require('./users')
const User = users.User

const itemSchema = new mongoose.Schema({
    name: String,
    expDate: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Item = mongoose.model('Item', itemSchema)

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    console.log("see this " + authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    } else if (authorization) {
        return authorization
    }
    return null
}

// get function that only gets items that belong to the user

itemsRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!token || !decodedToken.id) {
      console.log("NOOOOO")
      return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const items = await Item.find({ user: user._id })
  response.json(items)
}) 


/*
itemsRouter.get('/', (request, response) => {
  Item.find({}).then(items => {
    response.json(items)
  })
})
*/

/** 
itemsRouter.get('/:id', (request, response, next) => {
  Item.findById(request.params.id)
    .then(item => {
      if (item) {
        response.json(item)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
}) */

itemsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const item = new Item({
    name: body.name,
    expDate: body.expDate,
    image: body.image,
    user: user._id
  })

  const savedItem = await item.save()
  user.items = user.items.concat(savedItem._id)
  await user.save()
  
  response.status(201).json(savedItem)
})

itemsRouter.delete('/:id', (request, response, next) => {
  console.log("wow")
  Item.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

itemsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const item = {
    name: body.name,
    expDate: body.expDate,
    image: body.image,
  }

  Item.findByIdAndUpdate(request.params.id, item, { new: true })
    .then(updatedItem => {
      response.json(updatedItem)
    })
    .catch(error => next(error))
})

module.exports = itemsRouter