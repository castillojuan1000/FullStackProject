'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    user.hasMany(models.survey); //? is this the right association? 
  };
  return user;
};