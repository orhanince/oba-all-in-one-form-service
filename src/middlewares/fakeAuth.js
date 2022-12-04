/**
 *
 * @param user_id
 * @returns {(function(*, *, *): void)|*}
 */
module.exports = (user_id = '9474ea3e-e01a-4f1c-97e5-836ae71d26b1') => {
  return (req, res, next) => {
    req.AUTH = {
      user_id,
    };

    next();
  };
};
