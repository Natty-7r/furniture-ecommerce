const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');

class Admin extends Model {}

Admin.init(
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		super: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: 'admin',
	}
);
module.exports = Admin;
