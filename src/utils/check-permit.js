const _ = require('lodash');

/**
 *
 * @param roles
 * @param menuName
 * @param rowName
 * @returns {boolean}
 */
const checkPermit = ({ roles = [], menuName, rowName }) => {
  for (const role of roles) {
    const isPermitMenu = _.chain(role)
      .get('role_row_menu.roleMenu')
      .some(({ menu_name }) => menuName === menu_name)
      .value();

    const isPermitRow = _.chain(role)
      .get('role_row_menu.roleRow')
      .some(({ row_name }) => rowName === row_name)
      .value();

    if (isPermitMenu && isPermitRow) {
      return true;
    }
  }

  return false;
};

module.exports = checkPermit;
