const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const priceSchema = new mongoose.Schema({
   
    
    
    Ref_Price: {
        type: Number,
        trim: true,
    },
    Open_Price: {
        type: Number,
        trim: true,
    },
    security: {
        type: ObjectId,
        ref: 'Security',
        required: true,
        unique: true
    },
   
    
}, {timestamps: true}
);

// virtual field






   
module.exports = mongoose.model("Price", priceSchema);