'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Ensure this matches the name of your Users table
          key: 'id',      // Reference the 'id' column in the 'users' table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,       // Add validation to enforce that title is required
      },
      body: {
        type: Sequelize.TEXT,   // Use TEXT if you expect longer content
        allowNull: false,       // Add validation to enforce that body is required
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // Set default value to current timestamp
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // Set default value to current timestamp
      },
    });

      // compound index on authorId and createdAt
      await queryInterface.addIndex('user_notes', ['authorId', 'createdAt'], {
        name: 'idx_usernotes_author_created',
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_notes');
  },
};