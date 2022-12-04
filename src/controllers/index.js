const healthy = require('./healthy.controller');
const authController = require('./auth.controller');
const todoController = require('./todo.controller');
const formController = require('./form.controller');
/**
 *
 * @param app {Application}
 */
module.exports = (app) => {
  app.use('/', healthy);
  app.use('/auth', authController);
  app.use('/todo', todoController);
  app.use('/form', formController);
};
