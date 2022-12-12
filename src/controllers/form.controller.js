const express = require('express');
const router = express.Router();
const formService = require('./../services/form.service');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const auth = require('../middlewares/auth');
const validatorMiddleware = require('../middlewares/validator-middleware');
const { param } = require('express-validator');

/**
 * Form Model
 * @typedef {object} Todo
 * @property {string} todo_id - Todo id (UUID)
 * @property {string} user_id - User id (UUID)
 * @property {string} title - Todo title
 */

/**
 * @typedef {object} GetTodoList
 * @property {boolean} status - Service status
 * @property {number} count - Total todo count
 * @property {array<Todo>} count - Todo list
 */

/**
 * GET /todo/listTodos
 * @summary All all todos.
 * @tags Todo
 * @security bearerAuth
 * @return {GetTodoList} 200 - success response - application/json
 */
router.get('/', ...auth(), paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await formService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * GET /publish/{form_id}
 * @summary All all todos.
 * @tags Todo
 * @security bearerAuth
 * @return {GetTodoList} 200 - success response - application/json
 */
router.post('/publish/', ...auth(), async (req, res, next) => {
  try {
    const result = await formService.publishForm(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * GET /todo/listTodos
 * @summary All all todos.
 * @tags Todo
 * @security bearerAuth
 * @return {GetTodoList} 200 - success response - application/json
 */
router.post('/', ...auth(), paginationMiddleware(), async (req, res, next) => {
  try {
    const result = await formService.createForm(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

/**
 * PUT /{form_id}
 * @summary All all todos.
 * @tags Todo
 * @security bearerAuth
 * @return {GetTodoList} 200 - success response - application/json
 */
router.put(
  '/:form_id',
  ...auth(),
  validatorMiddleware(
    param('form_id').isString().isLength({ min: 3, max: 100 })
  ),
  async (req, res, next) => {
    try {
      const result = await formService.updateForm(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * Delete /{form_id}
 */
router.delete('/', ...auth(), async (req, res, next) => {
  try {
    const result = await formService.deleteForm(req);
    res.status(200).json(result);
  } catch (e) {
    // this line is require for global error handling.
    next(e);
  }
});

module.exports = router;
