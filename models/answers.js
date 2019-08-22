'use strict';
module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    surveyID: DataTypes.INTEGER,
    questions: DataTypes.STRING,
    answer: DataTypes.STRING,
    require: DataTypes.BOOLEAN
  }, {});
  answers.associate = function(models) {
    // associations can be defined here
    answers.belongsTo(models.survey);
    answers.belongsToMany(models.users, {through:'survey' , as: 'useranswers'});
  };
  return answers;
};