const {check, body} = require('express-validator');
const fs = require('fs');
const path = require('path');

const usersFilePath = require(path.join(__dirname, '../data/usersDB.json'));
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/usersDB.json'),'utf-8'));

module.exports = [
    check('surName').notEmpty().withMessage('Ingrese nombre y apellido').bail()
    .custom((value,{req}) => {
        if (typeof value != 'string') {
            return false;
        }
        return true;
    }).withMessage('Solo se admiten caracteres alfabéticos').bail()
    .isLength({min: 5}).withMessage('Debe tener 5 caracteres como mínimo'),
    
    check('nick').notEmpty().withMessage('Elija un nombre de usuario').bail()
    .isAlphanumeric().withMessage('Solo se admiten caracteres alfanuméricos').bail()
    .isLength({min: 2}).withMessage('Debe tener 2 caracteres como mínimo'),

    body('nick')
    .custom((value,{req}) => {
        let nickName = users.find(user => user.nick == value.trim());
        if (nickName) {
            return false;
        }
        return true;
    }).withMessage('El nombre de usuario está registrado'),

    check('born').notEmpty().withMessage('Ingrese su fecha de nacimiento').bail()
    .isDate().withMessage('Formato inválido'),

    check('address').notEmpty().withMessage('Ingrese su domicilio').bail()
    .custom((value,{req}) => {
        if (typeof value != 'string') {
            return false;
        }
        return true;
    }).withMessage('Solo se admiten caracteres alfabéticos'),

    check('profile').isString('buy' || 'sell').withMessage('Elija una opción'),

    check('interest')
    .custom((value,{req}) => {
        if (value.length < 1) {
            return false;
        }
        return true;
    }).withMessage('Elija una opción como mínimo'),

    check('pass').notEmpty().withMessage('Debe ingresar una contraseña').bail()
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

    body('pass2')
    .notEmpty().withMessage('Confirme la contraseña').bail()
    .custom((value,{req}) => {
        if(value !== req.body.pass){
            return false
        }
        return true
    }).withMessage('La verificación de la contraseña no coincide'),

    check('terms')
    .isString('on').withMessage('Debes aceptar los términos y condiciones')
]