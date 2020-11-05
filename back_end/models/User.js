'use strict'
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    // ,
    // birthdate: {
    //     type: Date
    // },
    // parentEmail: {
    //     type: String,
    // },
    // restricted: {
    //     type: Boolean,
    //     default: true
    // },
    // consents: {
    //     shareWithPartners: {
    //         type: Boolean,
    //         default: false
    //     },
    //     contactable: {
    //         type: Boolean,
    //         default: false
    //     }
    // }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);