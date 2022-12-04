'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('form_content', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.BIGINT,
      },
      form_content_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      form_id: {
        allowNull: true,
        type: DataTypes.UUID,
      },
      form_content: {
        type: DataTypes.TEXT,
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
    await queryInterface.dropTable('form_content');
  },
};
