const express = require('express');
const router = express.Router();
const authService = require('./../services/auth.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * @typedef {object} JwtResponse
 * @property {string} status - true
 * @property {string} access_token - Jwt Token
 */

/**
 * @typedef {object} LoginResponse
 * @property {string} status - true
 * @property {string} token - Request token
 */

/**
 * @typedef {object} LoginBody
 * @property {string} email - Email
 * @property {string} password - Password
 */

/**
 * POST /auth/login
 * @summary Log in
 * @tags Auth
 * @param {LoginBody} request.body.required - Create login body
 * @return {JwtResponse|LoginResponse} 200 - success response - application/json
 */
router.post(
  '/login',
  validatorMiddleware(
    body('email').isString().isLength({ min: 5, max: 100 }),
    body('password').isString().isLength({ min: 6, max: 100 })
  ),
  async (req, res, next) => {
    try {
      const result = await authService.login(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} RegisterResponse
 * @property {string} status - true
 * @property {string} token - Request token
 * @property {string} validation_code_id - validation code uuid or TEST_CUSTOMER_VALIDATION_CODE
 */

/**
 * @typedef {object} RegisterBody
 * @property {string} name - Name
 * @property {string} email - Email
 * @property {string} password - Password
 */

/**
 * POST /auth/signUp
 * @summary Sign up
 * @tags Auth
 * @param {RegisterBody} request.body.required - Create register body
 * @return {JwtResponse|RegisterResponse} 200 - success response - application/json
 */
router.post(
  '/register',
  validatorMiddleware(
    body('name').isString().isLength({ min: 5, max: 100 }),
    body('email').isString().isLength({ min: 5, max: 100 }),
    body('password').isString().isLength({ min: 6, max: 100 })
  ),
  async (req, res, next) => {
    try {
      const result = await authService.signUp(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * POST /auth/refresh
 * @summary Refresh token
 * @tags Auth
 * @security bearerAuth
 * @return {JwtResponse} 200 - success response - application/json
 */
router.post('/refresh', ...auth(), async (req, res, next) => {
  try {
    const result = await authService.refreshToken(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * @typedef {object} LogoutResponse
 * @property {boolean} status - Response status
 */

/**
 * POST /auth/logout
 * @summary Log out
 * @tags Auth
 * @security bearerAuth
 * @param {string} lng.header.required - language - enum:en,tr,ae
 * @return {LogoutResponse} 200 - success response - application/json
 */
router.post('/logout', ...auth(), async (req, res, next) => {
  try {
    const result = await authService.logout(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
