const mongoose = require('mongoose')
const participantSchema = new mongoose.Schema({
    member_name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    member_code: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    registration_type: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    registered_address: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    rc_number:{
        type: Number,
        default: 0
    },
    website: {
        type: String,
        trim: true,
        maxlength: 32
    },
    date_of_incorporation: {
        type: String,
        trim: true,
        maxlength: 32
    },
    phone: {
        type: Number,
        default: 0
    },
    sec_registered: {
        type: String,
        trim: true,
        maxlength: 32
    },
    pricipal_contact_name: {
        type: String,
        trim: true,
        maxlength: 50
    },
    pricipal_contact_phone: {
        type: Number,
        default: 0
    },
    pricipal_contact_email: {
        type: String,
        trim: true,
        maxlength: 50
    },
    enquires_contact_name: {
        type: String,
        trim: true,
        maxlength: 50
    },
    enquires_contact_phone: {
        type: Number,
        default: 0
    },
    enquires_contact_email: {
        type: String,
        trim: true,
        maxlength: 50
    },
    compliance_contact_name: {
        type: String,
        trim: true,
        maxlength: 50
    },
    compliance_contact_phone: {
        type: Number,
        default: 0
    },
    compliance_contact_email: {
        type: String,
        trim: true,
        maxlength: 50
    },
   
   
    
}, {timestamps: true}
);



module.exports = mongoose.model("Participant", participantSchema);