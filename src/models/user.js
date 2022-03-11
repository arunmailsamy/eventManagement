const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.__v;
    return user;

}

module.exports = mongoose.model('user', userSchema);
