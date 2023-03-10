const User = require('../models/user');
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");

//todo : display json message into postman after request launching
//todo : signup with account checking  / connexion / disconnection
//todo : send mail
//todo : validate email | npm install express-validator

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
                        .then(()=>res.status(201).json({message: 'Ouverture d\'un compte utilisateur !'}))
                        .catch(error => res.status(400).json({error}));
                })
                .catch(error => res.status(500).json({error}));
        }
    })
}


exports.login= async(req, res, next) => {
    User.findOne({email:req.body.login})
}

exports.getAllUser= async(req, res, next) => {
    const users = await User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(501).json({error}));
}

exports.deleteUser=async(req, res, next) => {
    console.log("delete user");
    await User.deleteOne({id:req.params.id})
        .then(() => res.status(204).json({ message: 'user deleted !'}))
        .catch(error => res.status(501).json({ error }));
}

exports.createUser=async(req, res, next) => {
    console.log("create user");
    const user = await new User(req.body);
    user.save()
        .then(() => res.status(201).json({ message: 'user created !'}))
        .catch(error => res.status(400).json({ error }));
}

exports.getUserById=async(req, res) => {
    console.log("get user by id");
    try{
        let user=await User.findOne({id:req.params.id});
        if (user){
            return res.status(200).json(user);
        }
        res.status(404).json({ message: 'user not found !'})
    } catch(error){
        res.status(501).json({ message : error.message })
    }
}

exports.updateUserById= async(req, res) => {
    console.log("update user by id");
    const user=await User.updateOne({id:req.params.id}, req.body)
        .then(()=> res.status(201).json({ message: 'user up-to-date  !'}))
        .catch(error => res.status(501).json({ error }));
}
exports.updatePartUserById=async(req, res) => {

    console.log("update part user by id");
    console.log("req.param.id : "+req.params.id);
    console.log("req.body : "+req.body.name + req.body.firstname);

    const user=await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(501).json({message : error.message});
    })
}