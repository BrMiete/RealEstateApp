const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "The user needs an user name"],
        minlength: [3, "The user name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "The user needs an email"],
    },
    password: {
        type: String,
        required: [true, "The user needs a password"],
    },
    postedEstates: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
}, {timestamps: true})

module.exports.User = mongoose.model('User', UserSchema)