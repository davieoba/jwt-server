const jwt = require('jsonwebtoken')
const User = require("../models/user-model")
const { JWT_SECRET } = require('./config')
const catchAsync = require("./catchAsync")

exports.checkUser = catchAsync(async (req, res, next) => {
  let token

  if (req.cookies) {
    const cookieData = req.cookies
    token = cookieData['jwt-server-token']
  }

  if (token === undefined || token?.length < 1) {
    return res.status(400).json({
      message: 'Unauthorized'
    })
  }

  //check if the token is valid

  const decoded = await jwt.verify(token, JWT_SECRET)
  // console.log(decoded)

  const user = await User.findById({ _id: decoded.id })
  if (!user) {
    return res.status(400).json({
      message: 'The user no longer exists'
    })
  }

  // check if the version of password in the jwt is the same as the version of password stored in the token
  if (Number(user.passwordVersion) !== Number(decoded.passwordVersion)) {
    return res.status(400).json({
      message: 'Password changed, login again'
    })
  }

  req.user = user
  next()
}) 

exports.restrict = (...role) => {
  return catchAsync((req, res, next) => {
    if (role.includes(req.user.role)) {
      return next()
    }

    res.status(400).json({
      message: 'Unauthorized'
    })
  })
}