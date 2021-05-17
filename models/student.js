const mongoose = require('mongoose');
var validator = require('validator');

const StudentUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // unique: [true, "Email already theres"],  //can't use this because unique is not validator
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Eamil not Valid");
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    address: {
        type: String,
        required: true
    }
})

//Collection creation through model
const User = new mongoose.model('User', StudentUserSchema);

module.exports = { User };