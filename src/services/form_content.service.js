const { Form } = require('./../models');

const paginationOptionGenerator = require('../utils/pagination-option-generator');
const { FormContent } = require('../models');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');

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
  console.log('options', options);
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

async function createFormContent(body) {
  const { form_id, form_content } = body;
  let formContentID = uuidv4();
  const formContent = await FormContent.create({
    form_content_id: formContentID,
    form_id: form_id,
    status: true,
    form_content: form_content,
    created_at: moment.utc().toISOString(),
  });
  return {
    status: true,
    formContent,
    formContentID: formContentID,
  };
}

module.exports = {
  getAll,
  createFormContent,
};
