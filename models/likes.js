'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    listingId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  likes.associate = function (models) {
    likes.belongsTo(models.users, { foreignKey: "userId" })
  };
  return likes;
};
