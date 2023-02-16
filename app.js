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

const userRoutes = require ('./routes/user');
const authRoutes = require ('./routes/auth');
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes);


module.exports = app;