const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

/**
 * Our model for the user table on MongoDB w/ the unique validator plugin which permit to be sure the user won't create a lot a accounts with only an email
 */
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
