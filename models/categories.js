/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const categories = sequelize.define('categories', {
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
		surveysId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'surveys',
				key: 'id'
			},
			field: 'surveysId'
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
			tableName: 'categories'
		});
	categories.associate = function (models) {
		categories.belongsTo(models.surveys, { foreignKey: 'surveysId' })
	}
	return categories
};