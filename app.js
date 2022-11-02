// thrid modules
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const { validationResult } = require('express-validator');

//my files
const sequelize = require('./util/db');
const { mainRoot } = require('./util/helper');
const userRoutes = require('./routes/userRoutes');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(favicon(__dirname + '/public/image/static/favicon.ico'));
app.use(express.static(path.join(mainRoot, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));

app.use(morgan());
app.use(helmet());
app.use(userRoutes);
app.use((error, req, res, next) => {
	res.status(500).render('./error.ejs');
});
sequelize.sync().then((result) => console.log());
app.listen(process.env.PORT || 8080);
