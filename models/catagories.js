const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../util/db');

class Catagory extends Model {}

Catagory.init(
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		image: {
			type: DataTypes.BLOB('long'),
			allowNull: false,
		},
		startingPrice: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'catagory',
	}
);
module.exports = Catagory;
