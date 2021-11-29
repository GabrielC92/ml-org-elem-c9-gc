// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const { register, processReg, login, processLog, logout } = require('../controllers/usersController');

router
    .get('/registro', register)
    .post('/registro', processReg)
    .get('/login', login)
    .post('/login', processLog)
    .get('/logout', logout)

module.exports = router;