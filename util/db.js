const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('', `freedb_natty7`, `qHQq&f4gy26rRpb`, {
	dialect: 'mysql',
	host: 'sql.freedb.tech',
	database: `freedb_wabegotte_new`,
	logging: false,
});

module.exports = sequelize;
