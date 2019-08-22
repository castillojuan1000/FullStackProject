'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    user.hasMany(models.surveys);
  };
  return user;
};