const { Form } = require('./../models');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
const formContentService = require('./form_content.service');
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

async function updateFormContentID(formContent, formID, userID) {
  const [formUpdate] = await Form.update(
    {
      form_content_id: formContent.form_content_id,
    },
    {
      where: {
        form_id: formID,
        user_id: userID,
      },
    }
  );
  return {
    status: true,
    formUpdate,
  };
}

async function createForm({ body, AUTH }) {
  const { form_name, form_content } = body;
  let formID = uuidv4();
  const form = await Form.create({
    form_id: formID,
    user_id: AUTH.user_id,
    form_name: form_name,
    status: true,
    created_at: moment.utc().toISOString(),
  });

  const formContent = await formContentService.createFormContent({
    form_id: formID,
    form_content: form_content,
  });
  if (formContent.status) {
    const formContentUpdate = await updateFormContentID(
      formContent.formContentID,
      formID,
      AUTH
    );
    if (formContentUpdate.status) {
      return {
        status: true,
        form,
      };
    }
  }
}

module.exports = {
  getAll,
  createForm,
};
