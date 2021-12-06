const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath,'utf-8'));

const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');

module.exports = {
    register: (req,res) => res.render('register'),
    processReg: (req,res) => {
        let errors = validationResult(req);
        const {surName,nick,born,address,profile,interest,pass} = req.body;
        //return res.send(req.body)
        if (errors.isEmpty()) {
            
            let user = {
                id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                surName : surName.trim(),
                nick : nick.trim(),
                born : born,
                address : address.trim(),
                profile : profile,
                interest : interest,
                password : bcryptjs.hashSync(pass.trim(),10),
                rol : 'user',
                avatar : req.file ? req.file.filename : 'avatar_default.png'
            }
            users.push(user);
            fs.writeFileSync(usersFilePath,JSON.stringify(users,null,2),'utf-8');
            req.session.userLogin = {
                id : user.id,
                nick : user.nick,
                avatar : user.avatar,
                rol : user.rol
            }
            return res.redirect('/');
        } else {
            return res.render('register',{
                errors : errors.mapped(),
                old : req.body
            });
        }
    },
    login: (req,res) => res.render('login'),
    processLog: (req,res) => {
        let errors = validationResult(req);
        const {nick,remind} = req.body;

        if (errors.isEmpty()) {
            let user = users.find(user => user.nick == nick.trim());
            req.session.userLogin = {
                id : user.id,
                nick : user.nick,
                avatar : user.avatar,
                rol : user.rol
            }
            if (remind) {
                res.cookie('mLiebreAr', req.session.userLogin, {maxAge: 1000 * 60 * 30});
            }
            return res.redirect('/');
        } else {
            return res.render('login',{
                errors : errors.mapped(),
                old : req.body
            });
        }
    },
    logout: (req,res) => {
        req.session.destroy();
        res.cookie('mLiebreAr', null, {maxAge: -1});
        return res.redirect('/');
    }
}