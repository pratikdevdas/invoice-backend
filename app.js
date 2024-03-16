const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const mailRouter = require('./sendMail')
const orderSlipRouter = require('./controllers/orderSlips')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/mail', mailRouter)
app.use('/api/orderSlips', orderSlipRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
