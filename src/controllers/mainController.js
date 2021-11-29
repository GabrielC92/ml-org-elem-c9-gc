const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	home: (req, res) => {
		return res.render('home',{
			products,
			toThousand,
			finalPrice
		});
	},
	search: (req, res) => {
		let result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()));
		return res.render('results',{
			busqueda: req.query.keywords.trim(),
			products: result,
			toThousand,
			finalPrice
		})
	},
};

module.exports = controller;
