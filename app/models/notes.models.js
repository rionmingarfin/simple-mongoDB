"use strict"

const mongose = require('mongoose');

const Notes = mongose.Schema({
    title : {
        type : String,
        required : true 
    },
    notes : {
        type : String,
        required : true
    },
    category :{
        type : mongose.Schema.Types.ObjectId,
        ref: 'category'
     }
},{
    timestamps: true
})

module.exports = mongose.model('notes' ,Notes)