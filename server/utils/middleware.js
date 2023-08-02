const catchAsync = require("./catchAsync")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')
const User = require("../models/user-model")

exports.checkUser = catchAsync(async (req, res, next) => {
  let token

  if (req.cookies) {
    const cookieData = req.cookies
    token = cookieData['jwt-server-token']
    console.log({ token })
  }

  if (!token) {
    return res.status(400).json({
      message: 'Unauthorized'
    })
  }

  //check if the token is valid
  const decoded = await jwt.verify(token, JWT_SECRET)
  console.log({ decoded })

  const user = await User.findById({ _id: decoded.id })
  if (!user) res.status(400).json({
    message: 'The user no longer exists'
  })

  // check if the version of password in the jwt is the same as the version of password stored in the token
  if (user.passwordVersion !== decoded.passwordVersion) {
    res.status(400).json({
      message: 'Password changed, login again'
    })
  }

  console.log({ user })
  req.user = user
  next()
}) 