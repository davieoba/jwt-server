const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    required: [true, 'email address is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  resetToken: {
    type: String
  },
  passwordResetExpire: {
    type: Date
  },
  passwordVersion: {
    type: Number,
    default: 1
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User