require('./utils/config')
const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth-routes')
const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', authRouter)

module.exports = app