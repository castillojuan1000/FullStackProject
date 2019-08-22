'use strict';
module.exports = (sequelize, DataTypes) => {
  const survey = sequelize.define('surveys', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});
  survey.associate = function (models) {
    survey.belongTo(models.user);
  };
  return survey;
};