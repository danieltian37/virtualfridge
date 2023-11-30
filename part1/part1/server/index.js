require('dotenv').config()
const path = require('path')
const http = require('http')
const itemsRouter = require('./controllers/items')
const users = require('./controllers/users')
const usersRouter = users.usersRouter
const loginRouter = require('./controllers/login')
const express = require('express')
const app = express()

app.use(express.static('dist'))

const mongoose = require('mongoose')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)
mongoose.connect(uri)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const cors = require('cors');
const corsOptions = {
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors());

app.use(express.json());
app.use('/api/items', itemsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);


app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})
