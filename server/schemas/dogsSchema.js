const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    breed: {
        type: String,

    },
    age: {
        type: Number,

    }, 
    userId: {
        type: String,
    },
    tricks: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model('Dog', dogSchema);