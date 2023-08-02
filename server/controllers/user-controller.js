const User = require('../models/user-model')
const catchAsync = require('../utils/catchAsync')

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')


  res.status(200).json({
    message: 'success',
    user
  })
})