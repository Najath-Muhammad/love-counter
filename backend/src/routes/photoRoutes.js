const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { getPhotos, uploadPhoto, updatePhoto, deletePhoto } = require('../controllers/photoController');

router.get('/', getPhotos);
router.post('/', protect, upload.single('image'), uploadPhoto);
router.put('/:id', protect, updatePhoto);
router.delete('/:id', protect, deletePhoto);

module.exports = router;
