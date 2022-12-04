const _ = require('lodash');
const GenericError = require('../utils/generic-error');
const checkPermit = require('../utils/check-permit');

/**
 *
 * @param menuName
 * @param rowName
 * @returns {(function(*, *, *): void)|*}
 */
const isPermitRoute = (menuName, rowName) => {
  return (req, res, next) => {
    const isPermitted = checkPermit({
      roles: _.get(req.AUTH, 'sub', []),
      menuName,
      rowName,
    });

    if (!isPermitted) {
      const forbidden = new GenericError(
        403,
        'forbidden_route',
        'You are not authorized to access!'
      );
      return next(forbidden);
    }

    next();
  };
};

module.exports = isPermitRoute;
