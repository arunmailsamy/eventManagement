const router = require('express').Router();
const bookingController = require('../controllers/booking');
router.get('/book/:id',bookingController.getBookingDetails);
router.post('/book',bookingController.bookEvent);
//router.put('/venue/:id',bookingController.updateVenue);
//router.delete('/venue/:id',bookingController.deleteVenue);


module.exports = router;