'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    surveyID: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
    categories.belongsTo(models.survey);
    categories.belongsToMany(models.users, {through:'survey' , as: 'GiftCategories' });
  };
  return categories;
};