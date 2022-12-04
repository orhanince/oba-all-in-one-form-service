const express = require('express');
const router = express.Router();

const healthyService = require('../services/healthy.service');

/**
 * Service control
 * @typedef {object} Service
 * @property {boolean} status - Healthy status
 * @property {string} service - Service Name
 * @property {number} uptime - Service Uptime
 */

/**
 * GET /
 * @summary Service checking endpoint
 * @tags Service
 * @return {Service} 200 - success response - application/json
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await healthyService.index(req, res);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * Healthy result type
 * @typedef {object} Healthy
 * @property {boolean} status - Healthy status
 */

/**
 * GET /healthy
 * @summary Healthy checking endpoint
 * @tags Healthy
 * @return {Healthy} 200 - success response - application/json
 */
router.get('/healthy', async (req, res, next) => {
  try {
    const result = await healthyService.healthy();
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

module.exports = router;
