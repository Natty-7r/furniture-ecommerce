const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');

class Product extends Model {}

Product.init(
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		productName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.BLOB('long'),
			allowNull: false,
		},
		priceString: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		deliveryString: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'product',
	}
);

module.exports = Product;
