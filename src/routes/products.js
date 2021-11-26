// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// Configuración Multer
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'./public/images/products');
    },
    filename: (req,file,callback) => {
        callback(null,`img-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', uploadFile.single('image'), productsController.store);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
