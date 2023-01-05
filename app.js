const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect(`mongodb+srv://${process.env.MONGOSE_PASSWORD}/Piiquante?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json()); //accès au corps de la requête

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
