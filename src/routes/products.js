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
const { index, create, store, detail, edit, update, destroy } = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', create); 
router.post('/create', uploadFile.single('image'), store);


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', edit); 
router.put('/edit/:id', update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', destroy); 


module.exports = router;
