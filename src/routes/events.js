const router = require('express').Router();

const eventController = require('../controllers/events');
router.get('/events/:id',eventController.fetchEvent);
router.post('/events',eventController.createEvent);

router.put('/events/:id',eventController.updateEvent);
router.delete('/events/:id',eventController.deleteEvent);

module.exports = router;