'use strict';
module.exports = (sequelize, DataTypes) => {
  const survey = sequelize.define('surveys', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {});
  survey.associate = function (models) {
    survey.belongsTo(models.users); //? is this the right association? 
  };
  return survey;
};