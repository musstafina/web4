const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        userId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true 
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        creationDate: {
            type: Date,
            default: Date.now
        },
        updateDate: {
            type: Date,
            default: null
        },
        deletionDate: {
            type: Date,
            default: null
        }
});

const User  = mongoose.model("users", userSchema);

module.exports = User;