const axios = require('axios');
const _ = require('lodash');
const GenericError = require('./generic-error');

const axiosRequest = axios.create({
  withCredentials: true,
});

axiosRequest.interceptors.response.use(
  (res) => res,
  (error) => {
    // Do something with response error
    const { response } = error;
    // response?.status === 401 es7 way.
    if (response && response.status === 401) {
      // Do logout;
      // Redirect to login;
      return Promise.reject(response);
    } else if (response) {
      // Do something.
      return Promise.reject(response && response.data);
    }
    return Promise.reject({
      message: error.message,
      statusCode: (response && response.status) || -1,
    });
  }
);

/**
 * How to use;
 * ```
 * const [error, serviceResponse] = await ApiRequest(req, ServiceUrl.TRIP, {
 *   method: 'GET',
 *   route: '/',
 * });
 *
 * // next...
 * ```
 *
 * ```
 * ApiRequest(req, ServiceUrl.TRIP, {
 *   method: 'GET',
 *   route: '/',
 * }).then(([error, serviceResponse]) => {
 *   // next...
 * });
 * ```
 *
 * @param req {Request} for auth
 * @param service {string} enum in ServiceUrl (for example https://catalog.ruut.tech)
 * @param opts {json}
 * @param opts.route {string} for example /users
 * @param opts.method {string} one of GET|POST|PUT|DELETE
 * @param opts.payload {json} post data
 * @param opts.query {json} query data
 * @param opts.headers {json} query data
 * @param opts.withoutAuth {boolean} true | false
 * @param opts.options {json} other axios options
 * @returns {Promise<unknown>}
 * @constructor
 */
const ApiRequest = async (req, service, opts) => {
  return new Promise(async (resolve) => {
    if (_.isEmpty(service)) {
      return resolve(
        [
          new GenericError(
            500,
            'service_address_must_not_be_empty',
            'The service address must not be empty.'
          ),
        ],
        null
      );
    }

    const {
      method,
      payload = {},
      query = {},
      route,
      headers,
      withoutAuth = false,
      options,
    } = opts;

    try {
      const NOW = new Date();

      const config = {
        url: `${service}${route}`,
        params: query,
        payload,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...(!withoutAuth && {
            authorization: req.headers.authorization,
          }),
          'request-time': NOW.toISOString(),
        },
        ...options,
      };

      const { data } = await axiosRequest(config);
      resolve([null, data]);
    } catch (e) {
      resolve([e, null]);
    }
  });
};

/**
 * Get Request
 *
 * How to use;
 * ```
 * const [error, serviceResponse] = await ApiGET(req, ServiceUrl.TRIP, {
 *   route: '/',
 * });
 *
 * // next...
 * ```
 *
 * ```
 * ApiRequest(req, ServiceUrl.TRIP, {
 *   route: '/',
 * }).then(([error, serviceResponse]) => {
 *   // next...
 * });
 * ```
 *
 * @param req {Request} for auth
 * @param service {string} enum in ServiceUrl (for example https://catalog.ruut.tech)
 * @param opts {json}
 * @param opts.route {string} for example /users
 * @param opts.payload {json} post data
 * @param opts.query {json} query data
 * @param opts.headers {json} query data
 * @param opts.withoutAuth {boolean} true | false
 * @param opts.options {json} other axios options
 * @returns {Promise<unknown>}
 * @constructor
 */
const ApiGET = (req, service, opts) => {
  return ApiRequest(req, service, {
    ...opts,
    method: 'GET',
  });
};

/**
 * Get Post
 *
 * How to use;
 * ```
 * const [error, serviceResponse] = await ApiPOST(req, ServiceUrl.TRIP, {
 *   route: '/',
 * });
 *
 * // next...
 * ```
 *
 * ```
 * ApiRequest(req, ServiceUrl.TRIP, {
 *   route: '/',
 * }).then(([error, serviceResponse]) => {
 *   // next...
 * });
 * ```
 *
 * @param req {Request} for auth
 * @param service {string} enum in ServiceUrl (for example https://catalog.ruut.tech)
 * @param opts {json}
 * @param opts.route {string} for example /users
 * @param opts.payload {json} post data
 * @param opts.query {json} query data
 * @param opts.headers {json} query data
 * @param opts.withoutAuth {boolean} true | false
 * @param opts.options {json} other axios options
 * @returns {Promise<unknown>}
 * @constructor
 */
const ApiPOST = (req, service, opts) => {
  return ApiRequest(req, service, {
    ...opts,
    method: 'POST',
  });
};

/**
 * Get Put
 *
 * How to use;
 * ```
 * const [error, serviceResponse] = await ApiPUT(req, ServiceUrl.TRIP, {
 *   route: '/',
 * });
 *
 * // next...
 * ```
 *
 * ```
 * ApiRequest(req, ServiceUrl.TRIP, {
 *   route: '/',
 * }).then(([error, serviceResponse]) => {
 *   // next...
 * });
 * ```
 *
 * @param req {Request} for auth
 * @param service {string} enum in ServiceUrl (for example https://catalog.ruut.tech)
 * @param opts {json}
 * @param opts.route {string} for example /users
 * @param opts.payload {json} post data
 * @param opts.query {json} query data
 * @param opts.headers {json} query data
 * @param opts.withoutAuth {boolean} true | false
 * @param opts.options {json} other axios options
 * @returns {Promise<unknown>}
 * @constructor
 */
const ApiPUT = (req, service, opts) => {
  return ApiRequest(req, service, {
    ...opts,
    method: 'PUT',
  });
};

/**
 * Get Delete
 *
 * How to use;
 * ```
 * const [error, serviceResponse] = await ApiDELETE(req, ServiceUrl.TRIP, {
 *   route: '/',
 * });
 *
 * // next...
 * ```
 *
 * ```
 * ApiRequest(req, ServiceUrl.TRIP, {
 *   route: '/',
 * }).then(([error, serviceResponse]) => {
 *   // next...
 * });
 * ```
 *
 * @param req {Request} for auth
 * @param service {string} enum in ServiceUrl (for example https://catalog.ruut.tech)
 * @param opts {json}
 * @param opts.route {string} for example /users
 * @param opts.payload {json} post data
 * @param opts.query {json} query data
 * @param opts.headers {json} query data
 * @param opts.withoutAuth {boolean} true | false
 * @param opts.options {json} other axios options
 * @returns {Promise<unknown>}
 * @constructor
 */
const ApiDELETE = (req, service, opts) => {
  return ApiRequest(req, service, {
    ...opts,
    method: 'DELETE',
  });
};

const ServiceUrl = {
  LOG_SERVICE: process.env.LOG_SERVICE,
  COMMUNICATION: process.env.COMMUNICATION_SERVICE,
  CUSTOMER: process.env.CUSTOMER_SERVICE,
  CATALOG: process.env.SERVICE_CATALOG,
  TRIP: process.env.SERVICE_TRIP,
  FINANCE: process.env.FINANCE_SERVICE,
};

module.exports = {
  ServiceUrl,
  ApiRequest,
  ApiGET,
  ApiPOST,
  ApiPUT,
  ApiDELETE,
};
