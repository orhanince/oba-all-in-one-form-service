const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize-client');
const moment = require('moment-timezone');

const RequestToken = sequelize.define(
  'request_token',
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
    is_expired: {
      type: DataTypes.VIRTUAL,
      get() {
        const value = this.getDataValue('expires');
        if (!value) {
          return false;
        }
        return moment.utc(value).isBefore(moment.utc());
      },
      set() {
        throw new Error("Don't usable!");
      },
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
  {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: true,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,

    // define the table's name
    tableName: 'request_token',
  }
);

module.exports = { RequestToken };
