const Token = require('./Token');

const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      //we make this for security because anyone can login as an admin
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
    Token.createSendToken(newUser, 200, res);
  } catch (err) {
    next(new AppError('Error', 404));
  }
};

exports.login = async (req, res, next) => {
  try {
    // const user = await User.findOne(req.body.email);
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Please provide a mail and password', 400));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('invalid email or password', 404));
    }
    console.log(user);
    Token.createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
  }
};
