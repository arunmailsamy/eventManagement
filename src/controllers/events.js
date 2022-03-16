const eventSchema = require('../models/events');
const venueSchema = require('../models/venue');
const bookingSchema = require('../models/booking');
const mongoose = require('mongoose');
const errors = require('../config/errors.json');
const fetchEvent = async (req, res, next) => {
    try {
        const eventDetails = await eventSchema.findOne({ _id: req.params.id });
        if (!eventDetails) {
            throw {
                ...errors[404],
                data: `cannot fetch the venue details : ${req.params.id}. ID not found`
            }
        }
        return res.json({ eventDetails });
    } catch (err) {
        next(err);
    }
}

const createEvent = async (req, res, next) => {
    try {

        const { category, name, description, image, vipPrice, gaPrice, slots, city, totalSeats, availableSeats, venueId } = req.body;
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
        const event = new eventSchema({ category, name, description, image, vipPrice, gaPrice, slots, city, totalSeats, availableSeats, venueId });
        const eventDetails = await event.save();
        return res.json({ eventDetails })
    } catch (err) {
        next(err);
    }
}


const updateEvent = async (req, res, next) => {
    try {
        const updatedEventDetails = await eventSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedEventDetails) {
            throw {
                ...errors[404],
                data: `cannot update the event details : ${req.params.id}. ID not found`
            }
        }
        return res.json({ updatedEventDetails })
    } catch (err) {
        next(err);
    }
}


const deleteEvent = async (req, res, next) => {

    try {
        const eventDetails = await eventSchema.findById({ _id: req.params.id });
        if (!eventDetails){
            throw {
                ...errors[404],
                data: `Event with ID :${req.params.id} NOT FOUND`
            }
        }
        const sess = await mongoose.startSession();
        sess.startTransaction();
        const getBookingByEvents = await bookingSchema.find({ eventId: req.params.id });
        let bookingList = [];
        for (let property = 0; property < getBookingByEvents.length; property++) {
            bookingList.push(getBookingByEvents[property]._id);
        }

        if (bookingList.length > 0) {
            const updateBooking = await bookingSchema.updateMany({ _id: { $in: bookingList } }, { $set: { bookingStatus: "Cancelled" } }, { multi: true, session: sess })//.session(sess);
            if (updateBooking.modifiedCount != bookingList.length) {
                throw {
                    ...errors[404],
                    data: `error while deleting the linked bookings for the event`
                }
            }

        }
  
        const deletedEventDetails = await eventSchema.deleteOne({ _id: req.params.id },{session:sess});
        if (!deletedEventDetails.deletedCount) {
            throw {
                ...errors[404],
                data: `cannot delete the event details with id : ${req.params.id}. ID not found`
            }
        }
        await sess.commitTransaction();
        res.json({ message: `Deleted successfully`, id: req.params.id })
    } catch (err) {
        console.log(`test3:${err}`);
        next(err);
    }

}
exports.fetchEvent = fetchEvent;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;