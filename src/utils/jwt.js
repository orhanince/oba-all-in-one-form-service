const jwt = require('jsonwebtoken');

const options = {
  issuer: process.env.JWT_ISSUER,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

/**
 * TODO code-refactor
 */
module.exports = {
  createJwtToken: (obj) => {
    try {
      //If this token is old token obj
      delete obj.iat;
      delete obj.exp;
      delete obj.iss;

      return jwt.sign(obj, process.env.JWT_SECRET, options);
    } catch (e) {
      console.error('JWT Sign Error: ', e);
      throw e;
    }
  },
  isValid: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET, options);
    } catch (e) {
      console.error('JWT Verify Error: ', e);
      return null;
    }
  },
};
