const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products',{
			products,
			toThousand,
			finalPrice
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => product.id == +req.params.id);
		return res.render('detail',{
			product,
			toThousand,
			finalPrice
		});
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name,price,discount,category,description} = req.body;

		if (name.trim() != "" && price != "") {
			let product = {
				id: products[products.length - 1].id + 1,
				name,
				price: +price,
				discount: +discount,
				category,
				description,
				image: req.file ? req.file.filename : 'default-image.png'
			}
			products.push(product);
			fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8');
			/* return res.redirect('/'); */
		}
		return res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productToEdit = products.find(product => product.id == +req.params.id);
		return res.render('product-edit-form',{
			products,
			productToEdit
		});
	},
	// Update - Method to update
	update: (req, res) => {
		const {name,price,discount,category,description} = req.body;

		products.forEach(product => {
			if (product.id == +req.params.id) {
				product.name = name;
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description;
			}
		});
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8');
		return res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsModify = products.filter(product => product.id != +req.params.id);
        fs.writeFileSync(productsFilePath,JSON.stringify(productsModify,null,2),'utf-8');
        return res.redirect('/products')
	}
};

module.exports = controller;