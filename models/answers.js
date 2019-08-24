'use strict';
module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    question: DataTypes.STRING,
    surveys_id: DataTypes.INTEGER,
    answer: DataTypes.STRING,
    require: DataTypes.BOOLEAN
  }, {});
  answers.associate = function (models) {
    // associations can be defined here
    answers.hasMany(models.surveys, { as: 'questions' });
  };
  return answers;
};