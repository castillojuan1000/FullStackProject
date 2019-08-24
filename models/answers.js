/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const answers = sequelize.define('answers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    question: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'question'
    },
    surveysId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'surveys',
        key: 'id'
      },
      field: 'surveysId'
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'answer'
    },
    require: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'require'
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
      tableName: 'answers'
    });
  answers.associate = function (models) {
    answers.belongsTo(models.surveys, { foreignKey: 'surveysId' })
  }
  return answers
};