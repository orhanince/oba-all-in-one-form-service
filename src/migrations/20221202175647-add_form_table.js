'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('form', {
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
      form_content_id: {
        allowNull: true,
        type: DataTypes.UUID,
      },
      form_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('form');
  },
};
