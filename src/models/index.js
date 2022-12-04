'use strict';
/*
 * how to use!
 *
 * for example Customer model in models/customer.js
 *
 * const Customer = required('./models/customer.js');
 *
 * module.exports = {
 *   Customer,
 *   ...OtherModels
 * };
 */
const { RequestToken } = require('./request_token');
const { User } = require('./user');
const { Todo } = require('./todo');
const { Form } = require('./form');
const { FormContent } = require('./form_content');
module.exports = {
  RequestToken,
  User,
  Todo,
  Form,
  FormContent,
};
