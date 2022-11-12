const fs = require('fs');
const path = require('path');
const { mainRoot, EthioDate } = require('../util/helper');

const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const Product = require('../models/products');
const Catagory = require('../models/catagories');
const Order = require('../models/orders');
const Message = require('../models/contactMessage');
const Admin = require('../models/admins');
const session = require('express-session');

// ---------- ordering
exports.adminGetIndex = async (req, res, next) => {
	try {
		const orders = await Order.findAll();
		res.render('./admin_views/ordersList.ejs', {
			orders,
			pageTitle: 'orders list ',
		});
	} catch (error) {
		next(error);
	}
};
exports.clearOrders = async (req, res, next) => {
	try {
		Order.destroy({ truncate: true }).then((orders) => {
			res.render('./admin_views/ordersList.ejs', {
				orders: [],
				pageTitle: 'orders list ',
			});
		});
	} catch (error) {
		next(error);
	}
};
exports.getOrderDetail = async (req, res, next) => {
	try {
		const orderInfo = req.params.orderInfo;
		const productId = orderInfo.split('*')[0];
		const orderId = orderInfo.split('*')[1];

		const order = await Order.findOne({ where: { id: orderId } });
		const product = await Product.findOne({ where: { id: order.productId } });

		const orderDetailed = {
			id: order.id,
			fullName: order.fullName,
			type: product.type,
			image: product.image,
			productName: product.productName,
			address: order.address,
			phone: order.phone,
			date: order.date,
			comment: order.description,
		};
		res.render('./admin_views/orderDetail', {
			pageTitle: `${orderDetailed.fullName} 's order `,
			order: orderDetailed,
		});
	} catch (error) {
		next(error);
	}
};
exports.clearOrder = async (req, res, next) => {
	try {
		Order.destroy({ where: { id: req.params.orderId } }).then(
			res.redirect('/admin/orders')
		);
	} catch (error) {
		next(error);
	}
};

exports.adminGetOrderDetail = async (req, res, next) => {
	try {
		res.render('./admin_views/orderDetail.ejs', { pageTitle: 'mine' });
	} catch (error) {
		next(error);
	}
};
// --------------------posts

//////----------------commenting

exports.getMesages = async (req, res, next) => {
	try {
		let messages = await Message.findAll();
		messages = messages.map((message) => {
			message.message = message.message.substr(0, 7) + '...';
			message.subject = message.subject.substr(0, 7) + '...';
			message.email = message.email.substr(0, 7) + '...';
			return message;
		});
		res.render('./admin_views/messageList.ejs', {
			messages,
			pageTitle: 'message  list ',
		});
	} catch (error) {
		next(error);
	}
};

exports.getMesageDetail = async (req, res, next) => {
	try {
		const commentId = req.params.commentId;
		let message = await Message.findOne({ where: { id: commentId } });

		res.render('./admin_views/messageDetail.ejs', {
			message,
			pageTitle: `${message.fullName} 's message  `,
		});
	} catch (error) {
		next(error);
	}
};
exports.clearMessages = async (req, res, next) => {
	try {
		Message.destroy({ truncate: true }).then((messages) => {});
		Message.findAll().then((messages) => {
			res.redirect('/admin/commentlist');
		});
	} catch (error) {
		next(error);
	}
};

// --------------- setting
exports.getSetting = async (req, res, next) => {
	try {
		const admin = req.session.admin;
		if (admin.super == 'superAdmin')
			return res.render('./admin_views/superSetting.ejs', {
				pageTitle: ` Admin setting `,
			});
		if (admin.super == 'not')
			return res.render('./admin_views/setting.ejs', {
				pageTitle: ` Admin setting `,
			});
	} catch (error) {
		next(error);
	}
};

exports.getAddAdmin = async (req, res, next) => {
	try {
		res.locals.redirect = false;
		res.render('./admin_views/adminAuth/addAdmin', {
			pageTitle: 'Add admin',
			name: '',
			username: '',
			message: ' ',
		});
	} catch (error) {
		next(error);
	}
};

exports.postAddAdmin = async (req, res, next) => {
	try {
		res.locals.redirect = false;
		let { fullName, username, password, confirmPassword } = req.body;
		username = username.trim();
		password = password.trim();
		const validationErrors = validationResult(req);
		const prevadmin = await Admin.findOne({ username: username });
		if (!validationErrors.isEmpty()) {
			return res.status(402).render('./admin_views/adminAuth/addAdmin', {
				pageTitle: 'add admin',
				name: fullName,
				username: username,
				message: validationErrors.array()[0].msg,
			});
		}
		if (prevadmin)
			return res.status(402).render('./admin_views/adminAuth/addAdmin', {
				pageTitle: 'add admin',
				name: fullName,
				username: username,
				message: 'በዚህ  usename የመዘበ ሌላ ADMIN አለ !',
			});
		const hashPassword = await bcrypt.hash(password, 12);
		const admin = await Admin.create({
			id: `_adminId_${Date.now().toString()}`,
			fullName,
			username,
			password: hashPassword,
			super: 'not',
		});
		res.locals.redirect = true;
		res.locals.adminName = admin.username;
		return res.render('./admin_views/adminAuth/addAdmin', {
			pageTitle: 'Add admin',
			name: '',
			username: '',
			message: ' ',
		});
	} catch (error) {
		next(error);
	}
};

// ------------ admin lsit

exports.getAdminList = async (req, res, next) => {
	try {
		const admins = await Admin.findAll({ where: { super: 'not' } });
		res.render('./admin_views/adminList', {
			pageTitle: 'admin list',
			admins,
		});
	} catch (error) {
		next(error);
	}
};
exports.removeAdmin = async (req, res, next) => {
	try {
		Admin.destroy({ where: { id: req.params.adminId } }).then(
			res.redirect('/admin/setting/admins')
		);
	} catch (error) {
		next(error);
	}
};

exports.getUpdateProfile = async (req, res, next) => {
	try {
		res.render('./admin_views/editProfile', {
			pageTitle: ' Edit profile ',
			username: '',
			message: ' ',
		});
	} catch (error) {
		next(error);
	}
};
exports.postUpdateProfile = async (req, res, next) => {
	try {
		let { adminId, username, oldPassword, password, confirmPassword } =
			req.body;
		username = username.trim();
		password = password.trim();
		const validationErrors = validationResult(req);
		const admin = await Admin.findOne({ where: { id: adminId } });
		const passwordRight = await bcrypt.compare(oldPassword, admin.password);
		if (!passwordRight)
			return res.render('./admin_views/editProfile', {
				pageTitle: ' Edit profile ',
				username: '',
				message: 'የቀድሞዉን ይልፍ ቁጥር ተሳስተዋል !',
			});

		if (!validationErrors.isEmpty())
			return res.render('./admin_views/editProfile', {
				pageTitle: ' Edit profile ',
				username: '',
				message: validationErrors.array()[0].msg,
			});

		const hashPassword = await bcrypt.hash(password, 12);
		admin.update({ username, password: hashPassword }).then((admin) => {
			session.admin = admin;
			res.redirect('/admin/setting');
		});
	} catch (error) {
		next(error);
	}
};
// --------------managing productst

exports.getProducts = async (req, res, next) => {
	try {
		let products = await Product.findAll();

		res.render('./admin_views/productList.ejs', {
			products,
			pageTitle: 'products  list ',
		});
	} catch (error) {
		next(error);
	}
};
exports.getProuctDetail = async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findOne({ where: { id: productId } });
		res.render('./admin_views/productDetail', {
			pageTitle: `order Detail `,
			product,
		});
	} catch (error) {
		next(error);
	}
};
exports.deleteProduct = async (req, res, next) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findOne({ where: { id: productId } });
		fs.unlink(
			path.join(mainRoot, 'public', 'image', 'products', productId),
			(err) => {
				if (err) console.log('error white deleting product image');
			}
		);
		product.destroy().then((p) => {
			res.redirect('/admin/products');
		});
	} catch (error) {
		next(error);
	}
};

exports.getAddProduct = async (req, res, next) => {
	try {
		res.render('./admin_views/addProduct.ejs', {
			pageTitle: 'add product',
			message: '',
			redirect: false,
			multiple: false,
		});
	} catch (error) {
		next(error);
	}
};

exports.adminAddProductPost = async (req, res, next) => {
	try {
		let fileError = req.fileError;
		const file = req.file;
		let { type, productName, priceString, deliveryString, multiple } = req.body;

		if (priceString == '') priceString = 'Negotiatable';
		if (deliveryString == '') deliveryString = 'Negotiatable';

		if (fileError) {
			return res.render('./admin_views/addProduct.ejs', {
				pageTitle: 'add product',
				message: 'የሚምርጡት file photo መሆን አለብት ',
				redirect: false,
				multiple,
			});
		}
		Product.create({
			id: `${file.filename}`,
			type,
			productName,
			priceString,
			deliveryString,
			image: `${file.filename}`,
		});
		if (multiple)
			return res.render('./admin_views/addProduct.ejs', {
				pageTitle: 'add product',
				message: '',
				redirect: true,
				multiple: true,
				type,
			});
		return res.redirect('/admin/products');
	} catch (error) {
		next(error);
	}
};

// ------------- managing catagories

exports.getCatagories = async (req, res, next) => {
	try {
		let catagories = await Catagory.findAll();
		catagories;
		res.render('./admin_views/catagoryList.ejs', {
			catagories,
			pageTitle: 'catagories  list ',
		});
	} catch (error) {
		next(error);
	}
};

exports.deleteCatagory = async (req, res, next) => {
	try {
		const catagoryId = req.params.catagoryId;
		const catagory = await Catagory.findOne({ where: { id: catagoryId } });
		catagory.destroy().then((c) => {
			res.redirect('/admin/catagories');
		});
	} catch (error) {
		next(error);
	}
};
exports.getCatagoryDetail = async (req, res, next) => {
	try {
		const catagoryId = req.params.catagoryId;
		const catagory = await Catagory.findOne({ where: { id: catagoryId } });
		res.render('./admin_views/catagoryDetail.ejs', {
			pageTitle: `catagory Detail `,
			catagory,
		});
	} catch (error) {
		next(error);
	}
};

exports.getAddCatagory = (req, res, next) => {
	try {
		res.render('./admin_views/addCatagory.ejs', {
			pageTitle: 'add catagory',
			message: '',
			redirect: false,
		});
	} catch (error) {
		next(error);
	}
};

exports.adminAddCatagoryPost = async (req, res, next) => {
	try {
		const file = req.file;
		let fileError = req.fileError;
		const { type, startingPrice } = req.body;

		if (fileError) {
			return res.render('./admin_views/addCatagory.ejs', {
				pageTitle: 'add catagory',
				message: 'የሚምርጡት file photo መሆን አለብት ',
				redirect: false,
			});
		}
		await Catagory.create({
			id: `_catId${file.filename}`,
			type,
			startingPrice,
			image: file.filename,
		});
		res.redirect('/admin/catagories');
	} catch (error) {
		next(error);
	}
};

//------------------------ changing home image ----------

exports.getImageChange = async (req, res, next) => {
	try {
		return res.render('./admin_views/adminAuth/imageChange.ejs', {
			pageTitle: 'Change Home Image',
			message: '',
			redirect: false,
		});
	} catch (error) {
		next(error);
	}
};
exports.postImageChange = async (req, res, next) => {
	try {
		let fileError = req.fileError;
		const { type, startingPrice } = req.body;

		if (fileError) {
			return res.render('./admin_views/adminAuth/imageChange.ejs', {
				pageTitle: 'Change Home Image',
				message: 'የሚምርጡት file photo መሆን አለብት ',
				redirect: true,
			});
		}

		res.redirect('/admin/setting');
	} catch (error) {
		next(error);
	}
};
