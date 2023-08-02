const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')

exports.login = catchAsync(async (req, res) => {
  // some code
})

exports.register = catchAsync(async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    throw new Error('missing credentials')
  }

  const user = await User.create(req.body)

  const { email, id } = user
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  })

  console.log({ token })

  res.status(200).json({
    message: 'user created',
    data: {
      user,
      token
    }
  })

})