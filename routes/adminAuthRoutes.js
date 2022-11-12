const router = require('express').Router();
const { body } = require('express-validator');
const adminAuthRController = require('../controllers/adminAuthController');
const isAuth = require('../controllers/adminAuthController').isAuth;

//
const validateAddAdmin = [
	body('password')
		.isStrongPassword({
			minLength: 8,
			minLowercase: 0,
			minNumbers: 1,
			minSymbols: 1,
			minUppercase: 0,
		})
		.withMessage('please use strong password  including numbers and symbols '),

	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) throw Error('password mismatch');
		return true;
	}),
];
//
router.get('/admin/login', adminAuthRController.geLogin);

router.get('/admin/logout', adminAuthRController.logout);

router.post('/admin/login', adminAuthRController.postLogin);

router.post(
	'/admin/createAdmin',
	validateAddAdmin,
	adminAuthRController.CreateAdmin
);

module.exports = router;
