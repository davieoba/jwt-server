const router = require('express').Router()
const { getUser, getAllUsers } = require('../controllers/user-controller')
const { checkUser, restrict } = require('../utils/middleware')


router.get('/', checkUser, getUser)
router.get('/info', checkUser, restrict(['admin']), getAllUsers)

module.exports = router