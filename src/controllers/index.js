const healthy = require('./healthy.controller');
const formController = require('./form.controller');
/**
 *
 * @param app {Application}
 */
module.exports = (app) => {
  app.use('/', healthy);
  app.use('/form', formController);
};
