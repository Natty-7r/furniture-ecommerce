const path = require('path');
const { mainRoot } = require('../util/helper');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

//
const Product = require('../models/products');
const Catagory = require('../models/catagories');
const Order = require('../models/orders');
const Message = require('../models/contactMessage');

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
					[Op.or]: [
						{
							productName: { [Op.substring]: searched },
							type: { [Op.eq]: searched },
						},
					],
				},
				limit: 6,
			});
			const nameMatch = await Product.findAll({
				where: {
					[Op.or]: [
						{
							productName: { [Op.substring]: searched },
						},
					],
				},
				limit: 6,
			});
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
		const date = now.toDateString();
		const preveData = { ...req.body };
		const validationError = validationResult(req);
		if (!validationError.isEmpty())
			return res.json({
				status: 'fail',
				data: { message: validationError.array()[0].msg },
				preveData,
			});

		// const order = req.body.data;
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

		Message.create({ ...req.body, date: new Date().toDateString() }).then(
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
