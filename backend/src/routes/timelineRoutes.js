const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/timelineController');

router.get('/', getEvents);
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
