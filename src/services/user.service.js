const _ = require('lodash');
const { User } = require('./../models');
const GenericError = require('../utils/generic-error');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const cryptoService = require('./crypto.service');
const jwt = require('./../utils/jwt');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
/**
 * Get all users
 * @param pagination
 * @param AUTH
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'user_id'],
    where: {
      status: true,
    },
  });

  const count = await User.count({
    where: options.where,
  });

  const data = await User.findAll({
    attributes: ['user_id', 'name', 'surname', 'username', 'email'],
    options,
  });

  return {
    status: true,
    count,
    data,
  };
}

/**
 * Create new user
 * @param {string} name
 * @param {string} surname
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function createUser({ name, surname, email, password }) {
  const foundUser = await User.count({
    where: {
      email: email,
    },
  });

  if (foundUser) {
    throw new GenericError(400, '', `User already exists!`, foundUser);
  }

  const now = moment.utc().toISOString();
  const createUser = await User.create({
    user_id: uuidv4(),
    name: name,
    surname: surname,
    email: email,
    password: cryptoService.hashPassword(password),
    status: 1,
    created_at: now,
    updated_at: now,
  });
  if (createUser) {
    return {
      status: true,
      token: jwt.createJwtToken({
        user_id: JSON.parse(JSON.stringify(createUser)).user_id,
      }),
    };
  }
}

/**
 * Get single user form database.
 * @param req
 * @returns {Promise<any>}
 */
async function getUser({ user_id, email }) {
  const filter = {
    where: {
      status: true,
      deleted_at: null,
    },
  };
  if (!_.isEmpty(user_id)) {
    filter.where.user_id = user_id;
  } else if (!_.isEmpty(email)) {
    filter.where.email = email;
  }
  return User.findOne(filter);
}

/**
 * Create user token.
 * @param {string} user_id
 * @param {string} email
 * @returns {Promise<*>}
 */
async function createUserToken({ user_id, email }) {
  const filter = {
    status: true,
    deleted_at: null,
  };

  if (!_.isEmpty(user_id)) {
    filter.user_id = user_id;
  } else if (!_.isEmpty(email)) {
    filter.email = email;
  }

  return User.findOne(filter);
}

async function revokeRequestToken() {}

module.exports = {
  createUser,
  getUser,
  createUserToken,
  getAll,
  revokeRequestToken,
};
