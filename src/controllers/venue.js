const venueSchema = require('../models/venue');
const eventSchema = require('../models/events');
const errors = require('../config/errors.json');

const fetchVenue = async (req, res, next) => {
    try {
        const venueDetails = await venueSchema.findOne({ _id: req.params.id });
        if (!venueDetails) {
            throw {
                ...errors[404],
                data: `cannot fetch the venue details : ${req.params.id}. ID not found`
            }
        }
        return res.json({ venueDetails });
    } catch (err) {
        next(err);
    }
}

const createVenue = async (req, res, next) => {
    try {

        const { contactInfo, address, name } = req.body;
        const venue = new venueSchema({ contactInfo, address, name });
        const venueDetails = await venue.save();
        return res.json({ venueDetails })
    } catch (err) {
        next(err);
    }
}

const updateVenue = async (req, res, next) => {
    try {
        const updatedVenueDetails = await venueSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatedVenueDetails) {
            throw {
                ...errors[404],
                data: `cannot update the venue details : ${req.params.id}. ID not found`
            }
        }
        return res.json({ updatedVenueDetails })
    } catch (err) {
        next(err);
    }
}

const deleteVenue = async (req, res, next) => {
    try {
        const eventDetails = await eventSchema.find({ venueId: req.params.id });
        if (eventDetails){
            throw {
                ...errors[404],
                data: `cannot delete venue: ${req.params.id}. Venue is already linked to an event`
            } 
        }
        const deletedVenueDetails = await venueSchema.deleteOne({ _id: req.params.id });
        if (!deletedVenueDetails.deletedCount) {
            throw {
                ...errors[404],
                data: `cannot delete the venue details with id : ${req.params.id}. ID not found`
            }
        }
        res.json({ message: `Deleted successfully`, id: req.params.id })
    } catch (err) {
        next(err);
    }
}

exports.fetchVenue = fetchVenue;
exports.createVenue = createVenue;
exports.updateVenue = updateVenue;
exports.deleteVenue = deleteVenue;