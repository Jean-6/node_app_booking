const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
//Connection to mongoose
mongoose.connect('mongodb+srv://root:root@cluster0.025ka.mongodb.net/?retryWrites=true&w=majority',
    {   dbName:'booking',
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

const User = require('./models/user');
//Todo : revoir la gestion des erreurs
app.post('/api/user/add', async(req, res, next) => {
    //delete req.body._id;
    const user = await new User(req.body);
    user.save()
        .then(() => res.status(201).json({ message: 'user created !'}))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/user/delete/:id', async(req, res, next) => {
    await User.deleteOne({id:req.params.id})
        .then(() => res.status(204).json({ message: 'user deleted !'}))
        .catch(error => res.status(501).json({ error }));
});

app.get('/api/users', async(req, res, next) => {
    const users=await User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(501).json({ error }));
});

app.get('/api/user/:id', async(req, res) => {
    try{
        let user=await User.findOne({id:req.params.id});
        if (user){
            return res.status(200).json(user);
        }
        res.status(404).json({ message: 'user not found !'})
    } catch(error){
        res.status(501).json({ message : error })
    }
});


app.put('/api/user/update/:id', async(req, res) => {
    const user=await User.updateOne({id:req.params.id}, req.body)
        .then(()=> res.status(201).json({ message: 'user up-to-date  !'}))
        .catch(error => res.status(501).json({ error }));
});

app.patch('/api/user/patch/:id', async(req, res) => {

    await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send.json(user);
    }).catch((error) => {
        res.status(501).send(error);
    })
});

module.exports = app;