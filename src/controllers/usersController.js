const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    register: (req,res) => res.render('register'),
    processReg: (req,res) => {},
    login: (req,res) => res.render('login'),
    processLog: (req,res) => {},
    logout: (req,res) => {}
}