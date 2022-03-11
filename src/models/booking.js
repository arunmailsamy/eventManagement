const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Types.ObjectId,
        ref: 'event'
    },
    noOfSeatsBooked: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    venueId: {
        type: mongoose.Types.ObjectId,
        ref: 'venue'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true });

bookingSchema.methods.toJSON = function () {
    const booking = this.toObject();
    delete booking.__v;
    return booking;

}

module.exports = mongoose.model('booking', bookingSchema);
