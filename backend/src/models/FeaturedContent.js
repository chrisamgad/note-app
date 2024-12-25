const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const FeaturedContent = sequelize.define('FeaturedContent', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'featured_content', // Optional: Specify custom table name
    timestamps: true,             // Includes `createdAt` and `updatedAt`
  });

  return FeaturedContent;
};