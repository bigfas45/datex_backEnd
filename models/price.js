const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')
const priceSchema = new mongoose.Schema({
    Date: {
        type: Date,
        trim: true,
        required: true,
        maxlength: 32

    },
    Security: {
        type: String,
        trim: true,
        maxlength: 32
    },
    Security_Name: {
        type: String,
        trim: true,
        required: true,
        unique: 32

    },
    Issued_Shares: {
        type: Number,
        trim: true,
    
    },
    Ref_Price: {
        type: String,
        trim: true,
    },
    Quote_Basis: String,
    role:{
        type: Number,
        default: 0
    },
    Bid_Depth:{
        type: Number,
        default: 0
    },
    Bid_Price: {
        type: Number
    },
    Offer_Price: {
        type: String,
        trim: true,
    }
}, {timestamps: true}
);

// virtual field






   
module.exports = mongoose.model("User", priceSchema);