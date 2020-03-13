const mongoose = require('mongoose')
const mailSchema = new mongoose.Schema({
    subject: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
   
    message: {
        type: String,
        required: true
     
    },
    
    file: {
        data: Buffer,
        contentType: String,
        path:String,
        name: String
    }
    
}, {timestamps: true}
);



module.exports = mongoose.model("Mail", mailSchema);