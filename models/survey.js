'use strict';
module.exports = (sequelize, DataTypes) => {
  const survey = sequelize.define('survey', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});
  survey.associate = function (models) {
    survey.belongsTo(models.user);
  };
  return survey;
};