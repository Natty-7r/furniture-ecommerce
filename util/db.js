const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('', `freedb_natty7`, `jyTSmgJ3@Mh8ESS`, {
	dialect: 'mysql',
	host: 'sql.freedb.tech',
	database: `freedb_wabegotte_new`,
	logging: false,
});

module.exports = sequelize;
