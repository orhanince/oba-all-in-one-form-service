const _ = require('lodash');
const GenericError = require('./../utils/generic-error');
const cryptoService = require('./crypto.service');
const jwt = require('./../utils/jwt');
const userService = require('./user.service');
/**
 * Register
 */
async function signUp(req) {
  const { name, email, password } = req.body || {};
  if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(password)) {
    throw new GenericError(
      400,
      'Missing fields',
      'Name, Email, Password required.'
    );
  }
  const user = await userService.getUser({ email });
  if (!_.isEmpty(user)) {
    throw new GenericError(400, 'user_already_exists', 'User already exists.');
  }

  const userCreatedResponse = await userService.createUser({
    name,
    email,
    password,
  });
  if (userCreatedResponse.status) {
    return {
      status: true,
      token: userCreatedResponse.token,
    };
  }
}

/**
 * Index
 * @param {object} req
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function login(req) {
  const { email, password } = req.body || {};
  if (_.isEmpty(email)) {
    throw new GenericError(
      400,
      'phone_or_username_required',
      `Phone or Username required.`
    );
  }

  const user = await userService.getUser({
    email,
  });
  if (!user) {
    throw new GenericError(400, 'user_not_found', `User not found.`);
  }

  if (!cryptoService.isEqualHashedPassword(password, user.password)) {
    throw new GenericError(400, 'password_wrong', `The password is wrong.`);
  }

  return {
    status: true,
    token: jwt.createJwtToken({ user_id: user.user_id }),
  };
}

async function logout(req) {
  const { request_token_id } = req.AUTH;
  await userService.revokeRequestToken(request_token_id);
  return {
    status: true,
  };
}

module.exports = {
  signUp,
  login,
  logout,
};
