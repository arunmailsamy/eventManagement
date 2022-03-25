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

    city: {
        type: String,
        required: true
    },

    slotDetails: [{ slot: Number, totalSeats: Number, availableSeatsGa: Number, availableSeatsVip: Number }],
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
