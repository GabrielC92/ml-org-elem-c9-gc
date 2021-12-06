// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const { register, processReg, login, processLog, logout } = require('../controllers/usersController');

const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const uploadAvatar = require('../middlewares/usersStorage');

router
    .get('/registro', register)
    .post('/registro', uploadAvatar.single('avatar'), registerValidator, processReg)
    .get('/login', login)
    .post('/login', loginValidator, processLog)
    .get('/logout', logout)

module.exports = router;