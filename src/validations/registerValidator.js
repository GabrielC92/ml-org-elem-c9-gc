const {check, body} = require('express-validator');

module.exports = [
    check('surName').notEmpty().withMessage('Ingrese nombre y apellido').bail()
    .isAlpha().withMessage('Solo se admiten caracteres alfabéticos').bail()
    .isLength({min: 5}).withMessage('Debe tener 5 caracteres como mínimo'),
    
    check('nick').notEmpty().withMessage('Elija un nombre de usuario').bail()
    .isAlpha().withMessage('Solo se admiten caracteres alfabéticos').bail()
    .isLength({min: 2}).withMessage('Debe tener 2 caracteres como mínimo'),

    check('born').notEmpty().withMessage('Ingrese su fecha de nacimiento').bail()
    .isDate().withMessage('Formato inválido'),

    check('address').notEmpty().withMessage('Ingrese su domicilio').bail()
    .isAlphanumeric().withMessage('Solo se admiten caracteres alfanuméricos').bail()
    .isLength({min: 10}).withMessage('Debe tener 10 caracteres como mínimo'),

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
    }).withMessage('La contraseña debe tener de 8 a 16 caracteres'),

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