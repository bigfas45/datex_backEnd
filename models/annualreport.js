const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const anuualreportSchema = new mongoose.Schema({
    company: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    year:{
        type: Number,
        required: true,
        default: 0
    },
    filename: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    security: {
        type: ObjectId,
        ref: 'Security',
        required: true,
    },
    file: {
        data: Buffer,
        contentType: String
    }
    
}, {timestamps: true}
);



module.exports = mongoose.model("Annualreport", anuualreportSchema);