const mongoose = require('mongoose')


const securitySchema = new mongoose.Schema({

    symbol: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true

    },

},
 {timestamps: true}
);




module.exports = mongoose.model("Security", securitySchema);