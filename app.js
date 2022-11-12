// thrid modules
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const { validationResult } = require('express-validator');

//my files
const sequelize = require('./util/db');
const { mainRoot } = require('./util/helper');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const session = require('express-session');
const SessionStore = require('connect-session-sequelize')(session.Store);

const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const favicon = require('serve-favicon');

//
const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (req.path == '/admin/addProduct')
			cb(null, path.join(mainRoot, 'public', 'image', 'products'));
		if (req.path == '/admin/addCatagory')
			cb(null, path.join(mainRoot, 'public', 'image', 'catagories'));

		if (req.path == '/admin/setting/ImageChange')
			cb(null, path.join(mainRoot, 'public', 'image', 'static'));
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.split('.')[0];
		const fileType = file.originalname.split('.')[1];
		// setting mimetype for validation
		if (req.path == '/admin/addProduct')
			cb(
				null,
				`_prodId_${Date.now().toString()}product_${fileName}.${fileType}`
			);
		if (req.path == '/admin/addCatagory')
			cb(
				null,
				`_catId_${Date.now().toString()}catagory_${fileName}.${fileType}`
			);
		// changing home image
		if (req.path == '/admin/setting/ImageChange') cb(null, `home.jpg`);
	},
});
const multerFilter = function fileFilter(req, file, cb) {
	req.fileError = false;
	const mimetype = file.mimetype;
	if (
		!(
			mimetype == 'image/jpeg' ||
			mimetype == 'image/png' ||
			mimetype == 'image/gif' ||
			mimetype == 'image/jpg'
		)
	) {
		cb(null, false);
		req.fileError = true;
	}

	if (
		mimetype == 'image/jpeg' ||
		mimetype == 'image/png' ||
		mimetype == 'image/gif' ||
		mimetype == 'image/jpg'
	)
		cb(null, true);
};

const sessionStorage = new SessionStore({
	db: sequelize,
	expiration: 3600 * 1000,
	checkExpirationInterval: 1000 * 600,
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(favicon(__dirname + '/public/image/static/favicon.ico'));
app.use(express.static(path.join(mainRoot, 'public')));
app.use(
	session({
		saveUninitialized: false,
		resave: true,
		secret: 'myadminsecret',
		store: sessionStorage,
		cookie: {
			maxAge: 1000 * 60 * 30000,
		},
	})
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(
	multer({ fileFilter: multerFilter, storage: multerStorage }).single('image')
);

// app.use(morgan());
// app.use(helmet());
app.use(userRoutes);
app.use(adminRoutes);
app.use(adminAuthRoutes);
// app.use((error, req, res, next) => {
// 	console.log(error);
// 	res.status(500).render('./error.ejs');
// });
sequelize
	.sync({ force: true })
	// .sync({ alter: true })
	// .sync()
	.then((result) => console.log());
app.listen(process.env.PORT || 8080);
