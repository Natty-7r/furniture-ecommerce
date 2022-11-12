const router = require('express').Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

const validateMessage = [
	body('fullName').custom((value, { req }) => {
		if (!value || value == '')
			throw Error(
				" Full፟ name Input can't be empty ! *  የሙሉ ስም ቦታ  ባዶ መሆን አይችልም"
			);
		return true;
	}),
	body('email').custom((value, { req }) => {
		if (!value || value == '')
			throw Error(
				"Email/ Phone number input can't be empty ! * የ ኢሜል / ስልክ  ቦታ  ባዶ መሆን አይችልም"
			);
		return true;
	}),
	body('subject').custom((value, { req }) => {
		if (!value || value == '')
			throw Error(
				"subject  input can't be empty ! *  የ Subject  ቦታ  ባዶ መሆን አይችልም"
			);
		return true;
	}),
	body('message').custom((value, { req }) => {
		if (!value || value == '')
			throw Error("Message input can't be empty ! *  የመልዕክት  ቦታ  ባዶ መሆን አይችልም");
		return true;
	}),
];
const validateOrder = [
	body('fullName').custom((value, { req }) => {
		if (!value || value == '')
			throw Error(
				" Full፟ name Input can't be empty ! *  የሙሉ ስም ቦታ  ባዶ መሆን አይችልም !"
			);
		return true;
	}),
	body('phone').custom((value, { req }) => {
		if (!value || value == '')
			throw Error(
				" Phone number input can't be empty ! * የ  ስልክ ቁጥር  ቦታ  ባዶ መሆን አይችልም !"
			);
		return true;
	}),
	body('address').custom((value, { req }) => {
		if (!value || value == '')
			throw Error(
				"Address  input can't be empty ! *  የ አድራሻ  ቦታ  ባዶ መሆን አይችልም !"
			);
		return true;
	}),
];
router.get('/', userController.getIndex);

router.get('/products/:searched', userController.getSearchedProducts);

router.get('/catagories', userController.getCatagories);

router.get('/catagories/:catId', userController.getCatagoryImage);

router.post('/allProducts', userController.getIndexedProducts);

router.post('/orders', validateOrder, userController.postOrders);

router.post('/contactMessage', validateMessage, userController.PostMessage);

module.exports = router;
