// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(
// 	'',
// 	`${process.env.DB_USERNAME}`,
// 	`${process.env.DB_PASSWORD}`,
// 	{
// 		dialect: 'mysql',
// 		host: `${process.env.HOST}`,
// 		database: `${process.env.DATABASE}`,
// 		logging: false,
// 	}
// );
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('', `root`, `next@7`, {
	dialect: 'mysql',
	host: `localhost`,
	database: `wabegotte`,
	logging: false,
});

module.exports = sequelize;
