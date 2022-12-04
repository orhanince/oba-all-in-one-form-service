/**
 * @param query
 * @returns {{q: null, orderType: string, offset: number, limit: number, orderColumn: string}}
 */
const paginationQueryParser = (query) => {
  // When the query string is parsed, the numbers come as strings.
  // ?limit=10&page=2&order=id:asc&q=search-text
  const {
    limit = '1000',
    q = null,
    page = '1',
    order = 'id:asc',
  } = query || {};

  console.log('query:', query);

  const [orderColumn = 'id', orderType = 'asc'] = String(order).split(':');
  return {
    limit: parseInt(limit),
    offset: (parseInt(page) - 1) * parseInt(limit),
    q,
    orderColumn,
    orderType,
  };
};

module.exports = paginationQueryParser;
