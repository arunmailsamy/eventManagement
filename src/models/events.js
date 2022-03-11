const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    vipPrice: {
        type: Number,
        required: true
    },
    gaPrice: {
        type: Number,
        required: true
    },
    slots: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    venueId: {
        type: mongoose.Types.ObjectId,
        ref: 'venue'
    }

}, { timestamps: true });

eventSchema.methods.toJSON = function () {
    const event = this.toObject();
    delete event.__v;
    return event;

}

module.exports = mongoose.model('event', eventSchema);
