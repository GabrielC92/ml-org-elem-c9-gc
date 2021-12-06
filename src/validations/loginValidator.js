const {check, body} = require('express-validator');
const users = require('../data/usersDB.json')
const bcryptjs = require('bcryptjs');

module.exports = [
    check('nick').notEmpty().withMessage('Ingrese su nombre de usuario').bail()
    .isAlphanumeric().withMessage('Solo se admiten caracteres alfabéticos').bail()
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
    })
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10
    }).withMessage('La contraseña debe tener de 8 a 16 caracteres, mayúscula/s, número/s y símbolo/s'),

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