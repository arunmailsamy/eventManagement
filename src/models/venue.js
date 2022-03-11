const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    contactInfo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true

    }

}, { timestamps: true });

venueSchema.methods.toJSON = function () {
    const venue = this.toObject();
    delete venue.__v;
    return venue;

}

module.exports = mongoose.model('venue', venueSchema);
