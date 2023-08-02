const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
const authRouter = require('./routes/auth-routes')
const userRoutes = require('./routes/user-routes')
const app = express()

// connect to mongodb
mongoose
  .connect(config.MONGODB_URI)
  .then(() => { console.log('Connected to the LOCAL DB') })
  .catch((err) => {
    console.log('error connecting to the DB', err)
  })

app.use(express.static(path.join(__dirname, 'dist')))

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRoutes)

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, 'dist') })
})

module.exports = app