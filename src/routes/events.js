const router = require('express').Router();

const eventController = require('../controllers/events');
router.get('/events/:id',eventController.fetchEvent);
router.post('/events',eventController.createEvent);


module.exports = router;