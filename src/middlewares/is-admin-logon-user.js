const _ = require('lodash');
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const isAdminLogonUser = (req, res, next) => {
  req.isAdminLogonUser = _.chain(req.AUTH)
    .get('sub')
    .some(({ role_name }) => /admin/.test(role_name))
    .value();

  next();
};

module.exports = isAdminLogonUser;
