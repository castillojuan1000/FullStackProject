'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    listing_id: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  likes.associate = function (models) {
    likes.belongsTo(models.users, { foreignKey: "user_id" })
  };
  return likes;
};
