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
		resetPasswordToken: {
			type: DataTypes.STRING,
			field: 'resetPasswordToken'
		},
		resetPasswordExpires: {
			type: DataTypes.DATE,
			field: 'resetPasswordExpires'
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
