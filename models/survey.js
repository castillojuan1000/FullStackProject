/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const surveys = sequelize.define('surveys', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'name'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'userId'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt'
    }
  }, {
      tableName: 'surveys'
    });
  surveys.associate = function (models) {
    surveys.belongsTo(models.users, { foreignKey: 'userId' })
    surveys.hasMany(models.answers, { foreignKey: 'surveysId' })
    surveys.hasMany(models.categories, { foreignKey: 'surveysId' })
  }
  return surveys
};