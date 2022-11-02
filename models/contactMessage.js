const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');

class Message extends Model {}

Message.init(
	{
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'message',
	}
);

module.exports = Message;
