const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");

const userSchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },

    password: String,

    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER"
    },
},

    {
        timestamps: true,
    }
)
const User = model("User", userSchema);

User.syncIndexes()

module.exports = User;
