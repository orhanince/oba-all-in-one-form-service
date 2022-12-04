const jwt = require('../utils/jwt');
const GenericError = require('../utils/generic-error');

module.exports = (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    const error = new GenericError(
      400,
      'authorization_not_found',
      '`authorization` field not found in header.'
    );
    return next(error);
  }
  // Disable for testing!
  const bearerToken = authorization && authorization.split(' ')[1];
  if (!bearerToken) {
    const error = new GenericError(
      400,
      'token_not_found_in_authorization',
      'The Parsed Token not found in header.'
    );
    return next(error);
  }

  req.AUTH = jwt.isValid(bearerToken);

  if (!req.AUTH) {
    const error = new GenericError(401, 'not_valid_token', 'Is not valid JWT');
    return next(error);
  }

  next();
};
