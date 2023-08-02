const catchAsync = require('../utils/catchAsync')
const router = require('express').Router()

router.get('/', catchAsync(async (req, res) => {
  res.send('ok')
}))

module.exports = router