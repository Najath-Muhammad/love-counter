const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getLetter, createLetter, updateLetter, getAllLetters } = require('../controllers/letterController');

router.get('/', getLetter);
router.get('/all', protect, getAllLetters);
router.post('/', protect, createLetter);
router.put('/:id', protect, updateLetter);

module.exports = router;
