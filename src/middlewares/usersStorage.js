const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './public/images/users');
    },
    filename: (req,file,cb) => {
        cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const fileFilter = function (req,file,cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        req.fileValidationError = "Solo se permiten imágenes *.jpg, *.jpeg, *.png, *.gif y *.webp";
        return cb(null,false,req.fileValidationError);
    }
    cb(null,true);
}

const uploadAvatar = multer({
    storage,
    fileFilter
})

module.exports = uploadAvatar;