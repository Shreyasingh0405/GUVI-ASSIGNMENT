const express = require('express')
const route = require('./routes/route.js')
const mongoose = require('mongoose')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
  next()
})

app.use(express.json()) // express.json();
app.use('/', route)

require('dotenv').config()

mongoose.connect('mongodb+srv://subhamsidharth:2NoDZjzEUgRaFunQ@cluster0.f3bng.mongodb.net/Rpage?retryWrites=true&w=majority', {
  useNewUrlParser: true
})
  .then(function () {
    console.log('Mongodb is connected successfully.')
  })
  .catch(function (err) {
    console.log(err)
  })

app.listen(process.env.PORT || 3000, function () { return console.log(`Express is running on port ${process.env.PORT || 3000}`) })
