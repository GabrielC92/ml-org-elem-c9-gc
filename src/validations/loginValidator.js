const {check, body} = require('express-validator');
const users = require('../data/usersDB.json')
const bcryptjs = require('bcryptjs');

module.exports = [
    check('nick').notEmpty().withMessage('Ingrese su nombre de usuario').bail()
    .isAlpha().withMessage('Solo se admiten caracteres alfabéticos').bail()
    .isLength({min: 2}).withMessage('Debe tener 2 caracteres como mínimo'),

    body('nick')
    .custom((value,{req}) => {
        let user = users.find(user => user.nick == value.trim());
        if (!user) {
            return false;
        }
        return true;
    }).withMessage('¡El nombre de usuario no está registrado!'),

    check('pass').notEmpty().withMessage('Debe ingresar su contraseña').bail()
    .isLength({
        min: 8,
        max: 16
    }).withMessage('La contraseña debe tener de 8 a 16 caracteres'),

    body('pass')
    .custom((value,{req}) => {
        let user = users.find(user => user.nick == req.body.nick.trim());
        if (!user || !bcryptjs.compareSync(value.trim(),user.password)) {
            return false;
        } else {
            return true;
        }
    }).withMessage('Credenciales inválidas')
]