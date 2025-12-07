const express = require('express');
const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    name:{
        type: String
    },
    color: {
        type: String
    },
    company: {
        type: String
    }
}, { versionKey: false });

const ProductModel = mongoose.model("user",UserSchema);

module.exports = ProductModel;