const router = require('express').Router();
const path = require('path');
const { mainRoot } = require('../util/helper');
const { body } = require('express-validator');
const adminController = require('../controllers/adminController');
const { isAuthSuper } = require('../controllers/adminAuthController');

//

const isAuth = require('../controllers/adminAuthController').isAuth;
const validateAddAdmin = [
	body('password')
		.isStrongPassword({
			minLength: 8,
			minLowercase: 0,
			minNumbers: 1,
			minSymbols: 1,
			minUppercase: 0,
		})
		.withMessage('ይለፍ ቁጥር  1 ቁጥር 1 symbol  ይዞ 8 ፊደል መሆን አለብት ! '),

	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) throw Error(' ያስገቧቸው የይለፍ ቁጥሮች አይመሳሰሉም !');
		return true;
	}),
];
const validateAddProuduct = [
	body('type').custom((value, { req }) => {
		if (!value || value == '') throw Error('  የዕቃ አይነት  ባዶ መሆን አይችልም !');
		return true;
	}),
	body('productName').custom((value, { req }) => {
		if (!value || value == '' || value.length < 5)
			throw Error(' የ የዕቃ ስም   5 ቃላት በላይ መሆን አለበት!');
		return true;
	}),
];
const validateAddCatagory = [
	body('type').custom((value, { req }) => {
		if (!value || value == '') throw Error('  የዕቃ አይነት  ባዶ መሆን አይችልም !');
		return true;
	}),
	body('startingPrice').custom((value, { req }) => {
		if (!value || value == '') throw Error('  መንሻ ዋጋ  ባዶ መሆን አይችልም !');
		return true;
	}),
];

//
//-----------managing orders
router.get('/naneAdmin', isAuth, adminController.adminGetIndex);

router.get('/admin/orders', isAuth, adminController.adminGetIndex);

router.get('/admin/orders/:orderInfo', isAuth, adminController.getOrderDetail);

router.get('/admin/clearOrder/:orderId', isAuth, adminController.clearOrder);

router.get('/admin/clearOrders', isAuth, adminController.clearOrders);

//  -------------managing  productst----------------

router.get('/admin/products', isAuth, adminController.getProducts);

router.get(
	'/admin/deleteProduct/:productId',
	isAuth,
	adminController.deleteProduct
);

router.get(
	'/admin/product/detail/:productId',
	isAuth,
	adminController.getProuctDetail
);

router.get('/admin/addProduct', isAuth, adminController.getAddProduct);

router.get(
	'/admin/addProduct/:multiple',
	isAuth,
	adminController.getAddProduct
);

router.post('/admin/addProduct', isAuth, adminController.adminAddProductPost);
router.post('/admin/addProduct', isAuth, adminController.adminAddProductPost);

// ------------ managing catagories------------------------
router.get('/admin/catagories', isAuth, adminController.getCatagories);

router.get(
	'/admin/catagoryDetail/:catagoryId',
	isAuth,
	adminController.getCatagoryDetail
);

router.get(
	'/admin/deleteCatagory/:catagoryId',
	isAuth,
	adminController.deleteCatagory
);
router.get('/admin/addCatagory', isAuth, adminController.getAddCatagory);

router.post('/admin/addCatagory', isAuth, adminController.adminAddCatagoryPost);

// ---------commenting

router.get('/admin/commentlist', isAuth, adminController.getMesages);

router.get('/admin/clearMessages', isAuth, adminController.clearMessages);

router.get(
	'/admin/messages/:commentId',
	isAuth,
	adminController.getMesageDetail
);

// ----------------

//----------------------------settings

router.get('/admin/setting', isAuth, adminController.getSetting);

router.get(
	'/admin/setting/addAdmin',
	isAuth,
	isAuthSuper,
	adminController.getAddAdmin
);

router.get(
	'/admin/setting/admins',
	isAuth,
	isAuthSuper,
	adminController.getAdminList
);

router.get(
	'/admin/setting/deleteAdmin/:adminId',
	isAuth,
	isAuthSuper,
	adminController.removeAdmin
);

router.post(
	'/admin/setting/addAdmin',
	isAuth,
	isAuthSuper,
	validateAddAdmin,
	adminController.postAddAdmin
);

router.get(
	'/admin/setting/updateProfile',
	isAuth,
	adminController.getUpdateProfile
);

router.post(
	'/admin/setting/updateProfile',
	isAuth,
	validateAddAdmin,
	adminController.postUpdateProfile
);
//  ------------- changing the file home image --------------
router.get(
	'/admin/setting/getImageChange',
	isAuth,
	isAuthSuper,
	adminController.getImageChange
);
router.post(
	'/admin/setting/ImageChange',
	isAuth,
	isAuthSuper,
	adminController.postImageChange
);

module.exports = router;
