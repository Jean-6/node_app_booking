const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const fs = require('fs');


function getRandoSecretKey(){
    const key = fs.readFileSync('./secret/privateKey', {encoding:'utf8', flag:'r'});
    return key;
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
                return res.status(401).json({ message: 'Incorrect login/password'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Incorrect login/password' });
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
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.logout= async(req, res, next) => {
    User.findOne({email:req.body.login})
}