const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

module.exports = {
    register: (req,res) => res.render('register'),
    processReg: (req,res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const {surName,nick,born,address,profile,interest,pass} = req.body;
            let user = {
                id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
                surName : surName.trim(),
                nick : nick.trim(),
                born : born,
                address : address.trim(),
                profile : profile,
                interest : interest,
                pass : bcryptjs.hashSync(pass.trim(),10),
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
                old : req.body,
                errors : errors.mapped()
            });
        }
    },
    login: (req,res) => res.render('login'),
    processLog: (req,res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const {nick,remind} = req.body;
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
                old : req.body,
                errors : errors.mapped()
            });
        }
    },
    logout: (req,res) => {
        req.session.destroy();
        res.cookie('mLiebreAr', null, {maxAge: -1});
        return res.redirect('/');
    }
}