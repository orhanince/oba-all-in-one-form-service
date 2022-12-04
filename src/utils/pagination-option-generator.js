const _ = require('lodash');
const { Op } = require('sequelize');
const { isUUID } = require('validator');

/**
 *
 * @param where {object}
 * @param pagination {{q: null, orderType: string, offset: number, limit: number, orderColumn: string}}
 * @param likeColumns {array<string>}
 * @param enums
 * @param disableSearch
 * @returns {{offset, limit: *, raw: boolean, where: {deleted_at: null, status: boolean}, order: (string)[][]}}
 */
const paginationOptionGenerator = ({
  where = {},
  pagination,
  likeColumns = [],
  enableSearch = true,
  enums = {},
}) => {
  const defaultWhere = {
    status: true,
    deleted_at: null,
  };

  const orConditions = [];

  if (pagination.q) {
    for (const likeColumn of likeColumns) {
      if (_.startsWith(likeColumn, 'uuid:')) {
        if (isUUID(pagination.q)) {
          orConditions.push({
            [likeColumn.substr(5)]: pagination.q,
          });
        }
        // skip is not valid UUID
      } else if (_.startsWith(likeColumn, 'enum:')) {
        const column = likeColumn.substr(5);

        if (_.values(enums[column]).includes(pagination.q)) {
          orConditions.push({
            [column]: pagination.q,
          });
        }
        // skip is not valid enum
      } else {
        orConditions.push({
          [likeColumn]: {
            [Op.iLike]: `%${pagination.q}%`,
          },
        });
      }
    }
  }

  if (enableSearch && orConditions.length) {
    defaultWhere[Op.or] = orConditions;
  }

  return {
    where: {
      ...defaultWhere,
      ...where,
    },
    raw: false,
    limit: pagination.limit,
    offset: pagination.offset,
    order: [[pagination.orderColumn, pagination.orderType]],
  };
};

module.exports = paginationOptionGenerator;
