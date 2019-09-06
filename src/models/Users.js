const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true
    },
    profilepic: {
        type: String
    },
    password: {
        type: String,
        required: true,

    }
});



module.exports = mongoose.model('User',UserSchema);