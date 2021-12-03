// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const { register, processReg, login, processLog, logout } = require('../controllers/usersController');

const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

router
    .get('/registro', register)
    .post('/registro', registerValidator, processReg)
    .get('/login', login)
    .post('/login', loginValidator, processLog)
    .get('/logout', logout)

module.exports = router;