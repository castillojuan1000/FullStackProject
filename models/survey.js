'use strict';
module.exports = (sequelize, DataTypes) => {
  const survey = sequelize.define('surveys', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});
  survey.associate = function (models) {
    survey.hasMany(models.users)
  };
  return survey;
};