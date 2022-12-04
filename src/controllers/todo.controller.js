const express = require('express');
const router = express.Router();
const todoService = require('./../services/todo.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const paginationMiddleware = require('../middlewares/pagination-middleware');
const { body, param } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * Todo Model
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
router.get(
  '/listTodos',
  ...auth(),
  paginationMiddleware(),
  async (req, res, next) => {
    try {
      const result = await todoService.listTodos(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} CreateTodoResponse
 * @property {string} status - true
 * @property {string} data - true
 */

/**
 * @typedef {object} TodoBody
 * @property {string} title.required - Todo title
 */

/**
 * POST /todo/createTodo
 * @summary Create todo
 * @tags Todo
 * @param {TodoBody} request.body.required - Create todo body
 * @return {CreateTodoResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.post(
  '/createTodo',
  ...auth(),
  validatorMiddleware(body('title').isString().isLength({ min: 5, max: 255 })),
  async (req, res, next) => {
    try {
      const result = await todoService.createTodo(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} UpdateTodoResponse
 * @property {string} status - true
 */

/**
 * PUT /todo/markTodoCompleted/{todo_id}
 * @summary Update todo as completed by todo id.
 * @tags Todo
 * @param {string} todo_id.path - Todo id.
 * @return {UpdateTodoResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.put(
  '/markTodoCompleted/:todo_id',
  ...auth(),
  validatorMiddleware(param('todo_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await todoService.markTodoCompleted(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * PUT /todo/markTodoUncompleted/{todo_id}
 * @summary Update todo as uncompleted by todo id.
 * @tags Todo
 * @param {string} todo_id.path - Todo id.
 * @return {UpdateTodoResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.put(
  '/markTodoUncompleted/:todo_id',
  ...auth(),
  validatorMiddleware(param('todo_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await todoService.markTodoUncompleted(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * @typedef {object} DeleteTodoResponse
 * @property {string} status - true
 */

/**
 * DELETE /todo/deleteTodo/{todo_id}
 * @summary Delete todo by todo id.
 * @tags Todo
 * @param {string} todo_id.path - Todo id.
 * @return {DeleteTodoResponse} 200 - success response - application/json
 * @security bearerAuth
 */
router.delete(
  '/deleteTodo/:todo_id',
  ...auth(),
  validatorMiddleware(param('todo_id').isUUID('4')),
  async (req, res, next) => {
    try {
      const result = await todoService.deleteTodo(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
