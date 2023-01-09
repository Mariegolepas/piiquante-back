const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidate = require('../middleware/password-validator');

/**
 * Controller to signup into our API
 * With a Password Validator to securise access to API
 * With an hash system to securise our datas (passwords)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.signup = (req, res, next) => {
    if (passwordValidate.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé!'}))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    } else {
        res.status(400).json({message: "Merci d'utiliser un mot de passe contenant au minimum 2 chiffres, des majuscules, des minuscules et au minimum 8 caractères."});
    }
    
};

/**
 * Controller to log into our API
 * Permit to compare our hash information with the one given
 * Give a 24h token to our user to permit him to do whatever needed for on the API (modify, create, delete & like/dislike)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null) {
            res.status(401).json({message: 'Paire identifiant/mot-de-passe incorrecte'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Paire identifiant/mot-de-passe incorrecte'});
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.SECRET_TOKEN_KEY, //Token
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => res.status(500).json({error}))
};