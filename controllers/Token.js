const jwt = require('jsonwebtoken');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //to convert 90 days to milliseconds
    ),
    httpOnly: true //to receive cookie and store it and send it to the server with every request
    // secure: true, //to make it works on https only && we need it only in production environment not development environment
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined; //remove the password from the output
  // user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};
