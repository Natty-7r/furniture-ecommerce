const path = require('path');
const { mainRoot, EthioDate } = require('../util/helper');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

//
const Product = require('../models/products');
const Catagory = require('../models/catagories');
const Order = require('../models/orders');
const Message = require('../models/contactMessage');
const { writeFile } = require('fs');

exports.getIndex = async (req, res, next) => {
	try {
		const numberOfProducts = 6;
		let pagination = {
			page: undefined,
			type: 'all',
		};

		const existingProducts = await Product.count();
		if (existingProducts > numberOfProducts) pagination.page = 2;
		const products = await Product.findAll({ limit: numberOfProducts });
		const catagories = await Catagory.findAll();
		res.render('./user/index.ejs', { products, catagories, pagination });
	} catch (error) {
		next(error);
	}
};

exports.getSearchedProducts = async (req, res, next) => {
	try {
		const searched = req.params.searched;
		let products, existingProducts;
		let pagination = { page: undefined, type: searched };
		if (searched === 'all') {
			existingProducts = await Product.count();
			if (existingProducts > 6) pagination.page = 2;

			products = await Product.findAll({
				limit: 6,
			});
		}
		if (searched !== 'all') {
			existingProducts = await Product.count({ where: { type: searched } });
			if (existingProducts > 6) pagination.page = 2;

			const typeMatch = await Product.findAll({
				where: {
					type: searched,

					// [Op.and]: [
					// 	{
					// 		productName: { [Op.substring]: searched },
					// 		type: { [Op.eq]: searched },
					// 	},3
					// ],
				},
				limit: 6,
			});
			const nameMatch = [];

			products = [...typeMatch, ...nameMatch];
		}
		if (!products)
			return res.json({ status: 'fail', data: { cause: 'no products' } });
		if (products.length == 0)
			return res.json({ status: 'fail', data: { cause: 'no products' } });
		if (products)
			return res.json({ status: 'success', data: { products, pagination } });
	} catch (error) {
		next(error);
	}
};

exports.getCatagories = async (req, res, next) => {
	try {
		let catagories = await Catagory.findAll();
		if (!catagories)
			return res.json({
				status: 'fail',
				data: { cause: 'no catagories found ' },
			});
		if (catagories.length == 0)
			return res.json({ status: 'fail', data: { cause: 'no catagories' } });
		if (catagories)
			return res.json({ status: 'success', data: { catagories } });
	} catch (error) {
		if (error) next(error);
	}
};
exports.getCatagoryImage = async (req, res, next) => {
	try {
		const catId = req.params.catId;
		let catagory = await Catagory.findOne({ where: { id: catId } });
		if (!catagory)
			return res.json({
				status: 'fail',
				data: { cause: 'no catagories found ' },
			});
		if (catagory) {
			const image = catagory.image;
			return res.json({ status: 'success', data: { image } });
		}
	} catch (error) {
		if (error) next(error);
	}
};

exports.getIndexedProducts = async (req, res, next) => {
	try {
		const pagination = { page: undefined };
		const { pageNo, type } = req.body;
		const numberOfProducts = 6;
		let products, existingProducts;
		if (type !== 'all') {
			existingProducts = await Product.count({ where: { type } });
			if (existingProducts > numberOfProducts * +pageNo)
				pagination.page = pageNo + 1;
			products = await Product.findAll({
				offset: numberOfProducts * (pageNo - 1),
				limit: numberOfProducts,
				where: {
					type,
				},
			});
		}

		if (type === 'all') {
			existingProducts = await Product.count();
			if (existingProducts > numberOfProducts * +pageNo)
				pagination.page = pageNo + 1;

			products = await Product.findAll({
				offset: numberOfProducts * (pageNo - 1),
				limit: numberOfProducts,
			});
		}

		if (!products)
			return res.json({
				status: 'fail',
				data: { message: 'no products found ' },
			});
		if (products.length == 0)
			return res.json({ status: 'fail', data: { message: 'no products' } });
		if (products)
			return res.json({ status: 'success', data: { products, pagination } });
	} catch (error) {
		next(error);
	}
};

exports.postOrders = async (req, res, next) => {
	try {
		const now = new Date();
		const date = EthioDate(now);
		const preveData = { ...req.body };
		const validationError = validationResult(req);
		if (!validationError.isEmpty())
			return res.json({
				status: 'fail',
				data: { message: validationError.array()[0].msg },
				preveData,
			});

		Order.create({ ...req.body, date }).then((order) => {
			const orderedProduct = order.type;
			const owner = order.fullName.toString().split(' ')[0];

			const orderToSend = { owner, orderedProduct };

			return res.json({
				status: 'success',
				data: {
					message: 'order saved successfully ',
					order: orderToSend,
				},
			});
		});
	} catch (error) {
		next(error);
	}
};

exports.PostMessage = async (req, res, next) => {
	try {
		const validationError = validationResult(req);
		if (!validationError.isEmpty())
			return res.json({
				status: 'fail',
				data: {
					message: validationError.array()[0].msg,
					preveData: { ...req.body },
				},
			});

		Message.create({ ...req.body, date: EthioDate(new Date()) }).then(
			(message) => {
				return res.json({
					status: 'success',
					data: {
						message: 'message saved successfully ',
					},
				});
			}
		);
	} catch (error) {
		next(error);
	}
};
