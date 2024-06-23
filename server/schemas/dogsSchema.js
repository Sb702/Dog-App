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

    }
});

module.exports = mongoose.model('Dog', dogSchema);