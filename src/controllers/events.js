const eventSchema = require('../models/events');
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

        const { category, name,description,image,vipPrice,gaPrice,slots,city,totalSeats,availableSeats,venueId } = req.body;
        const event = new eventSchema({ category, name,description,image,vipPrice,gaPrice,slots,city,totalSeats,availableSeats,venueId});
        const eventDetails = await event.save();
        return res.json({ eventDetails })
    } catch (err) {
        next(err);
    }
}
exports.fetchEvent = fetchEvent;
exports.createEvent = createEvent;