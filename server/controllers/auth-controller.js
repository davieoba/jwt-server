const bcrypt = require("bcryptjs")
const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const { JWT_SECRET } = require('../utils/config')

const sign_jwt = async (user) => {
  const token = jwt.sign({ email: user.email, id: user._id, passwordVersion: user.passwordVersion }, JWT_SECRET, {
    expiresIn: 60 * 60 * 1000
  })

  return token
}

const sendToken = async (user, statusCode = 200, res) => {
  const token = await sign_jwt(user)

  res.cookie('jwt-server-token', token, {
    httpOnly: true,
    // secure: true,
    maxAge: 60 * 60 * 1000
  })

  res.status(statusCode).json({
    message: 'login successful',
    data: {
      user,
      token
    }
  })
}

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

  sendToken(user, 200, res)
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

  sendToken(user, 200, res)
})

exports.logout = catchAsync((req, res) => {
  res.cookie('jwt-server-token', '', {
    httpOnly: true,
    // secure: true,
    maxAge: 1
  })
  req.user = null

  res.redirect('/')
})