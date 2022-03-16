const bookingSchema = require('../models/booking');
const eventSchema = require('../models/events');
const venueSchema = require('../models/venue');
const userSchema = require('../models/user');
const errors = require('../config/errors.json');
const mongoose = require('mongoose');

const getBookingDetails = async (req, res, next) => {
    try {
        const bookingDetails = await bookingSchema.findOne({ _id: req.params.id });
        if (!bookingDetails) {
            throw {
                ...errors[404],
                data: `cannot fetch the booking details : ${req.params.id}. ID not found`
            }
        }
        return res.json({ bookingDetails });
    } catch (err) {
        next(err);
    }
}
const getBookingsByUser = async (req, res, next) => {
    try {
        const userDetails = await userSchema.findOne({ _id: req.params.id });

        if (!userDetails) {
            throw {
                ...errors[404],
                data: `User ID not found`
            }
        }
        const bookingDetails = await bookingSchema.find({ userId: req.params.id });
        if (!bookingDetails) {
            throw {
                ...errors[404],
                data: `cannot fetch the booking details : ${req.params.id}. ID not found`
            }
        }
        return res.json({ bookingDetails });
    } catch (err) {
        next(err);
    }
}

const bookEvent = async (req, res, next) => {

    try {
        let eventDetails;
        const { eventId, noOfSeatsBooked, totalPrice, bookingStatus, bookingDate, venueId, userId } = req.body;
        if (eventId) {
            eventDetails = await eventSchema.findOne({ _id: eventId });
            if (!eventDetails) {
                throw {
                    ...errors[404],
                    data: `cannot find the venue details : ${eventId}. ID not found`
                }
            }
        } else {
            throw {
                ...errors[404],
                data: `eventId is mandatory`
            }
        }

        if (venueId) {
            const venueDetails = await venueSchema.findOne({ _id: venueId });
            if (!venueDetails) {
                throw {
                    ...errors[404],
                    data: `cannot find the venue details : ${venueId}. ID not found`
                }
            }
        } else {
            throw {
                ...errors[404],
                data: `venueId is mandatory`
            }
        }
        //To be replaced for user id validation once user is created
        /* if (userId) {
            const userDetails = await userSchema.findOne({ _id: userId });
            if (!userDetails) {
                throw {
                    ...errors[404],
                    data: `cannot find the user details`
                }
            }
        } else {
            throw {
                ...errors[404],
                data: `userId is mandatory`
            }
        }*/
        const sess = await mongoose.startSession();
        sess.startTransaction();
        let bookingDetails = new bookingSchema({ eventId, noOfSeatsBooked, totalPrice, bookingStatus: "Booked", bookingDate, venueId, userId });
        bookingDetails = await bookingDetails.save({ session: sess });
        if (!bookingDetails) {
            throw {
                ...errors[404],
                data: `cannot book the tickets`
            }
        }

        let availableSeats = eventDetails.availableSeats - bookingDetails.noOfSeatsBooked;

        if (availableSeats < 0 || eventDetails.availableSeats <= 0) {
            throw {
                ...errors[404],
                data: `No of seats exceed the available seats`
            }
        }

        const updatedEventDetails = await eventSchema.findByIdAndUpdate(eventId, { $set: { availableSeats } }, { new: true, session: sess });
        if (!updatedEventDetails) {
            throw {
                ...errors[404],
                data: `cannot update the venue details : ${req.params.id}. ID not found`
            }
        }
        await sess.commitTransaction();
        return res.json({ bookingDetails })
    } catch (err) {
        next(err);
    }
}


exports.getBookingDetails = getBookingDetails;
exports.bookEvent = bookEvent;
exports.getBookingsByUser = getBookingsByUser;