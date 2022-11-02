const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
	'',
	`${process.env.DB_USERNAME}`,
	`${process.env.DB_PASSWORD}`,
	{
		dialect: 'mysql',
		host: `${process.env.HOST}`,
		database: `${process.env.DATABASE}`,
		logging: false,
	}
);

module.exports = sequelize;
