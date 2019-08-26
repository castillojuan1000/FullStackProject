/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'name'
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'email',
			unique: true,
			validate: {
				isEmail: true
			}
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'password_hash'
		},
		reset_password_token: {
			type: DataTypes.STRING,
			field: 'reset_password_token'
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
			tableName: 'users'
		});
	users.associate = function (models) {
		users.hasMany(models.surveys)
	};
	return users
};
