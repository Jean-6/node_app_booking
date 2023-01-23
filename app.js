const express = require('express');
const app = express();
app.use((req, res) => {
    res.json( {message :'Voilà la reponse du serveur !'});
})
module.exports = app;