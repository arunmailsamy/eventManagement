const router = require('express').Router();
const venueController = require('../controllers/venue');
router.get('/venue/:id',venueController.fetchVenue);
router.post('/venue',venueController.createVenue);
router.put('/venue/:id',venueController.updateVenue);
router.delete('/venue/:id',venueController.deleteVenue);


module.exports = router;