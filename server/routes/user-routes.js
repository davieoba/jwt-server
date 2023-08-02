const router = require('express').Router()
const { getUser } = require('../controllers/user-controller')
const { checkUser } = require('../utils/middleware')


router.get('/', checkUser, getUser)

module.exports = router