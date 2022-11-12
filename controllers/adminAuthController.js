const Admin = require('../models/admins');
const { validationResult, body } = require('express-validator');

const bcrypt = require('bcrypt');
const session = require('express-session');
const { use } = require('../routes/adminRoutes');

exports.geLogin = async (req, res, next) => {
	try {
		const admins = await Admin.findAll();
		if (admins.length === 0) {
			res.render('./admin_views/adminAuth/createAdmin', {
				pageTitle: 'create admin',
				superAdmin: 'super',
				name: '',
				username: '',
				message: ' ',
				admin: undefined,
			});
		}

		if (admins.length > 0) {
			res.render('./admin_views/adminAuth/login', {
				pageTitle: 'Log In ',
				message: '',
				username: '',
				admin: undefined,
			});
		}
	} catch (error) {
		next(error);
	}
};
exports.logout = async (req, res, next) => {
	try {
		req.session.destroy((admin) => {
			return res.redirect('/admin/login');
		});
	} catch (error) {
		next(error);
	}
};
exports.postLogin = async (req, res, next) => {
	try {
		let { username, password } = req.body;
		username = username.trim();
		password = password.trim();
		const admin = await Admin.findOne({ where: { username } });
		if (!admin)
			return res.render('./admin_views/adminAuth/login', {
				pageTitle: 'Log In ',
				message: 'log in Error ',
				username: '',
				admin: {
					username: '',
				},
			});
		if (admin) {
			const passwordMismatch = await bcrypt.compare(password, admin.password);
			if (!passwordMismatch)
				return res.render('./admin_views/adminAuth/login', {
					pageTitle: 'Log In ',
					message: 'log in Error  ',
					username: '',
					admin: {
						username: '',
					},
				});
		}
		req.session.admin = admin;
		res.redirect('/admin/orders');
	} catch (error) {
		next(error);
	}
};
exports.CreateAdmin = async (req, res, next) => {
	try {
		let { fullName, username, password, confirmPassword } = req.body;
		//  triming inputs
		username = username.trim();
		password = password.trim();
		const validationErrors = validationResult(req);

		if (!validationErrors.isEmpty()) {
			return res.status(402).render('./admin_views/adminAuth/createAdmin', {
				pageTitle: 'create admin',
				superAdmin: 'super',
				name: fullName,
				username: username,
				message: validationErrors.array()[0].msg,
			});
		}

		const hashPassword = await bcrypt.hash(password, 12);
		const admin = await Admin.create({
			id: Date.now().toString(),
			fullName,
			username,
			password: hashPassword,
			super: 'superAdmin',
		});
		session.admin = admin;
		res.redirect('/admin/orders');
	} catch (error) {
		next(error);
	}
};
exports.isAuth = async (req, res, next) => {
	try {
		if (!req.session.admin) return res.redirect('/admin/login');
		if (req.session.admin) {
			res.locals.admin = req.session.admin;
			next();
		}
	} catch (error) {
		next(error);
	}
};
exports.isAuthSuper = async (req, res, next) => {
	try {
		const admin = req.session.admin;
		if (admin.super === 'not') return res.redirect('/admin/setting');
		next();
	} catch (error) {
		next(error);
	}
};
