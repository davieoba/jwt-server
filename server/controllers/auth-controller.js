const bcrypt = require("bcryptjs")
const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const { JWT_SECRET } = require('../utils/config')

exports.login = catchAsync(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw new Error('please fill in all missing credentials')
  }

  // get the user
  const user = await User.findOne({ email: req.body.email })

  if (!user) throw new Error('404, user not found, register!')

  // if user found compare passwords
  const auth = await bcrypt.compare(req.body.password, user.password)

  if (auth === false) {
    return res.status(401).json({
      message: 'Failed credentials'
    })
  }

  const token = jwt.sign({ email: user.email, id: user._id, passwordVersion: user.passwordVersion }, JWT_SECRET, {
    expiresIn: 60 * 60 * 1000
  })

  res.cookie('jwt-server-token', token, {
    httpOnly: true,
    // secure: true,
    maxAge: 60 * 60 * 1000
  })

  res.status(200).json({
    message: 'login successful',
    data: {
      user,
      token
    }
  })

})

exports.register = catchAsync(async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    throw new Error('missing credentials')
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10)
  })

  const { email, id, passwordVersion } = user
  const token = jwt.sign({ email, id, passwordVersion }, JWT_SECRET, {
    expiresIn: 60 * 1000,
  })

  res.cookie('jwt-server-token', token, {
    httpOnly: true,
    // secure: true,
    maxAge: 60 * 60 * 1000
  })

  res.status(201).json({
    message: 'user created',
    data: {
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    }
  })
})

exports.logout = catchAsync((req, res) => {
  res.cookie('jwt-server-token', '', {
    httpOnly: true,
    // secure: true,
    maxAge: 1
  })

  res.redirect('/')
})