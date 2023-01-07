const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

require('dotenv').config();

//Connexion to mongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGOSE_PASSWORD}/Piiquante?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json()); //access to our request body
app.use(helmet.xssFilter()); //add helmet protection for Cross Sites Scripting issues

//Set all Headers needed for our API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Tell to our Express app what to use and the URI of the informations
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
