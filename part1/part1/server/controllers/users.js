require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.post('/', async (request, response) => {
  try {  
    const { username, name, password } = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })
    
    const savedUser = await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response
      .status(201)
      .send({ token, username: user.username, name: user.name })
  } catch (error) {
    console.log("wowiebazoonga ur username agoonga")
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate("items")
  response.json(users)
})

module.exports = {
  usersRouter,
  User
};
