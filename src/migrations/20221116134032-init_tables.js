'use strict';

const { DataTypes } = require('sequelize');
const { RequestToken, User, Todo } = require('../models');

module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const opts = {
        transaction: t,
      };

      // request_token table
      await queryInterface.createTable(
        RequestToken.tableName,
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
          },
          request_token_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          user_id: {
            allowNull: false,
            type: DataTypes.UUID,
          },
          ip_address: {
            allowNull: false,
            type: DataTypes.STRING(50),
          },
          is_revoked: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
          expires: {
            allowNull: true,
            type: DataTypes.DATE,
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
          },
        },
        opts
      );
      await queryInterface.addIndex(
        RequestToken.tableName,
        ['id', 'request_token_id', 'user_id'],
        opts
      );

      // user table
      await queryInterface.createTable(
        User.tableName,
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
          },
          user_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          name: {
            allowNull: false,
            type: DataTypes.STRING(30),
          },
          email: {
            allowNull: false,
            type: DataTypes.STRING(50),
          },
          password: {
            allowNull: true,
            type: DataTypes.STRING(255),
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
          },
        },
        opts
      );
      await queryInterface.addIndex(User.tableName, ['id', 'user_id'], opts);

      // todo table
      await queryInterface.createTable(
        Todo.tableName,
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
          },
          todo_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          user_id: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          todo: {
            allowNull: false,
            type: DataTypes.STRING,
          },
          is_completed: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
          },
        },
        opts
      );
      await queryInterface.addIndex(
        Todo.tableName,
        ['id', 'todo_id', 'user_id'],
        opts
      );
    });
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const opts = {
        transaction: t,
      };
      // remove request_token table
      await queryInterface.dropTable(RequestToken.tableName, opts);
      // remove user table
      await queryInterface.dropTable(User.tableName, opts);
      // remove todo table
      await queryInterface.dropTable(Todo.tableName, opts);
    });
  },
};
