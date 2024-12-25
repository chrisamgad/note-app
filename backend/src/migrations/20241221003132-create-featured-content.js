'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('featured_content', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

      // index on createdAt column
      await queryInterface.addIndex('featured_content', {
        fields: ['createdAt'],
        name: 'idx_featured_content_createdAt',
      });


    // Insert initial data
    await queryInterface.bulkInsert('featured_content', [
      {
        title: 'Example 1 Static content',
        content: 'This is the first example.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Example 2 - static content',
        content: 'This is the second example.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Example 3 Lorem Ipsum',
        content: 'This is the content of the featured content for example 3.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Example 4 Lorem Ipsum',
        content: 'This is the content of the featured content for example 4.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('featured_content');
  },
};