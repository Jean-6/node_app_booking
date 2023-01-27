const express = require('express');
const app = express();

const mongoose = require('mongoose');


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
app.use((req, res) => {
    res.json( {message :'Voilà la reponse du serveur !'});
})

//User

const User = require('./models/user');
const add_user=app.post('/api/user', async (req, res, next) => {
    delete req.body._id;
    const user = await new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});


module.exports = app;