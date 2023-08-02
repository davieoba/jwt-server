const user = require('../models/user-model')
const catchAsync = require('../utils/catchAsync')

exports.getUser = catchAsync(async (req, res) => {
  const user = await user.find()
})