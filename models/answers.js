'use strict';
module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    question: DataTypes.STRING,
    surveysid: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    require: DataTypes.BOOLEAN
  }, {});
  answers.associate = function(models) {
    // associations can be defined here

    answers.belongsTo(models.surveys);
    answers.belongsToMany(models.users, {through:'surveys'});
  };
  return answers;
};