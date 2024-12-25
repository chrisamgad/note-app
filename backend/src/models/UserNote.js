'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserNote extends Model {
    /**
     * Define associations here.
     * This method is called automatically by the `models/index` file.
     */
    static associate(models) {
      // A UserNote belongs to a User (author)
      UserNote.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'author',
        onDelete: 'CASCADE',
      });
    }
  }

  UserNote.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'UserNote',
      tableName: 'user_notes',
      timestamps: true,
    }
  );

  return UserNote;
};