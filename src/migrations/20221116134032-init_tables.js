'use strict';

const { DataTypes } = require('sequelize');
const { Form } = require('../models');

module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const opts = {
        transaction: t,
      };

      // user table
      await queryInterface.createTable(
        Form.tableName,
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
          },
          form_id: {
            allowNull: false,
            type: DataTypes.UUID,
          },
          user_id: {
            allowNull: false,
            type: DataTypes.UUID,
          },
          form_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          form_content: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          form_published: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          form_published_at: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          created_at: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
          },
          deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
          },
        },
        opts
      );
      await queryInterface.addIndex(Form.tableName, ['id', 'user_id'], opts);
    });
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const opts = {
        transaction: t,
      };
      // remove user table
      await queryInterface.dropTable(Form.tableName, opts);
    });
  },
};
