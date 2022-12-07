const { Form } = require('./../models');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const paginationOptionGenerator = require('../utils/pagination-option-generator');
/**
 * Get all users
 * @param pagination
 * @param AUTH
 * @returns {Promise<{data: Promise<Model[]> | Promise<any[]>, count: *, status: boolean}>}
 */
async function getAll({ pagination, AUTH }) {
  const options = paginationOptionGenerator({
    pagination,
    likeColumns: ['id', 'form_id', 'user_id'],
    where: {
      status: true,
      user_id: AUTH.user_id,
    },
  });
  const count = await Form.count({
    where: options.where,
  });

  const data = await Form.findAll({
    where: options.where,
  });

  return {
    status: true,
    count,
    data,
  };
}

async function createForm({ body, AUTH }) {
  const { form_name, form_content } = body || {};
  let formID = uuidv4();
  const createForm = await Form.create({
    form_id: formID,
    user_id: AUTH.user_id,
    form_name: form_name,
    form_content: form_content,
    form_published: false,
    status: true,
    created_at: moment.utc().toISOString(),
  });
  return {
    status: true,
    data: createForm,
  };
}

module.exports = {
  getAll,
  createForm,
};
