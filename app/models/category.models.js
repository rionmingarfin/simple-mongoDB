'use strict'

const mongose = require('mongoose');

const categorySchema = mongose.Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
    },
    image : {
        type : String,
        required : true,
    }
}, {
    timestamps: true
})

module.exports = mongose.model('category',categorySchema);