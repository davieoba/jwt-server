require('dotenv').config('./.env')
const { PORT } = process.env
const { LOCAL_DB } = process.env
const { JWT_SECRET } = process.env
const { MONGODB_URI } = process.env

module.exports = {
  PORT,
  LOCAL_DB,
  JWT_SECRET,
  MONGODB_URI
}