passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const fs = require('fs');

var logout = require('express-passport-logout');


function getRandoSecretKey(){
    const key = fs.readFileSync('./secret/privateKey', {encoding:'utf8', flag:'r'});
    return key;
}

exports.resetPassByEmail=(q, res, next)=>{

/*
    const user = await User.findOne({ email });

    if (!user) throw new Error("User does not exist");
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email,"Password Reset Request",{name: user.name,link: link,},"./template/requestResetPassword.handlebars");
    return link;*/


}

exports.resetPassByForm=(q, res, next)=>{


}
exports.signup= (req, res, next) => {

    User.findOne({email:req.body.email },function(err,user){
        if(err){
            console.log(err.message)
        }
        let  msg;
        if(user){
            msg="user exists"
            console.log(msg)
            res.json({message: msg})
            //return res.redirect('/') //todo : to replace with right URL
        }else{
            bcrypt.hash(req.body.password,10)
                .then(hash =>{
                    const user= new User({
                        name: req.body.name,
                        firstname: req.body.firstname,
                        email: req.body.email,
                        login: req.body.login,
                        password: hash
                    });
                    user.save()
                        .then(()=>res.status(201).json({message: 'Opening user account !'}))
                        .catch(error => res.status(400).json({error}));
                })
                .catch(error => res.status(500).json({error}));
        }
    })
}


exports.login= async(req, res, next) => {

    console.log("login");
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(401).json({ message: 'Incorrect login/password'});
                //return res.redirect('/') //todo : to replace with right URL
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: 'Incorrect login/password' });
                        //return res.redirect('/') //todo : to replace with right URL
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({userId:user._id},getRandoSecretKey(),
                            {expiresIn:'2h'},
                            function (err, token){
                            console.log("token generated at login :"+token)
                        })
                        /*token:jwt.sign({userId:user._id}, 'privateKey', { algorithm: 'RS256' }, function(err, token) {
                            console.log(token);
                        })*/
                        //return res.redirect('/') //todo : to replace with right URL to redirect

                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.logout= ( req, res, next) => { //todo : to do work this middleware
    console.log("logout");
    req.logout()
    req.session.destroy();
    res.redirect("/"); //return res.redirect('/') //todo : to replace with right URL to redirect
}