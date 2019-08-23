'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    name: DataTypes.STRING,
    surveysid: DataTypes.INTEGER
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
    categories.belongsTo(models.surveys);
  
    
  };
  return categories;
};