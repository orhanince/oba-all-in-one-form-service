const jwtTokenValidation = require('./jwt-token-validation');

/**
 *
 * @param menuName
 * @param rowName
 */
const auth = () => {
  return [jwtTokenValidation];
};

module.exports = auth;
