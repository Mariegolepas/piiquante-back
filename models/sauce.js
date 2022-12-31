const mongoose = require('mongoose');

/**
 * We create the schema of data we want to catch for our database
 */
const sauceSchema = mongoose.Schema({
    userId : {type : String, required: true},
    name : {type : String, required: true},
    manufacturer : {type : String, required: true},
    description : {type : String, required: true},
    mainPepper : {type : String, required: true},
    imageUrl : {type : String, required: true},
    heat : {type: Number, required: true},
    likes : {type: Number, required: true},
    dislikes : {type: Number, required: true},
    usersLiked : [{type: String, required: true}],
    usersDisliked : [{type: String, required: true}],
});

/**
 * We change this schema in a usable model
 */
module.exports = mongoose.model('Sauce', sauceSchema);