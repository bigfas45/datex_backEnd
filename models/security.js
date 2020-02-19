const mongoose = require('mongoose')


const securitySchema = new mongoose.Schema({
    security: {
        type: String,
        trim: true,
        required: true
        

    },
    symbol: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32

    },

},
 {timestamps: true}
);




module.exports = mongoose.model("Security", securitySchema);