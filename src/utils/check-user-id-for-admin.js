const { buildCheckFunction } = require('express-validator');
const { isUUID } = require('validator');
const checkBodyOrQuery = buildCheckFunction(['body', 'query']);

/**
 * Example usage
 *
 * router.get(
 *   '/',
 *   ...auth(RoleMenu.COUNTRIES, RoleRow.LIST),
 *   validatorMiddleware(checkUserIdForAdmin),
 *   paginationMiddleware(),
 *   async (req, res, next) => {}
 * );
 *
 */
const checkUserIdForAdmin = checkBodyOrQuery('user_id').custom(
  (value, { req }) => {
    if (!req.isAdminLogonUser) {
      return true;
    }

    // Indicates the success of this synchronous custom validator
    return isUUID(value);
  }
);

module.exports = checkUserIdForAdmin;
