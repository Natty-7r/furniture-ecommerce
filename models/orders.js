const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');

class Order extends Model {}

Order.init(
	{
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		productId: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		date: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},

	{
		sequelize,
		modelName: 'Order',
	}
);

module.exports = Order;
