const mongoose = require('mongoose');

/**
 * We create the schema of data we want to catch for our database
 */
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},
});

/**
 * We change this schema in a usable model
 */
module.exports = mongoose.model('Thing', thingSchema);