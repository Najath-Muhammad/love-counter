const Photo = require('../models/Photo');
const { cloudinary } = require('../config/cloudinary');

// GET /api/photos
const getPhotos = async (req, res) => {
  const photos = await Photo.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: photos });
};

// POST /api/photos  (admin)
const uploadPhoto = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const { caption, memoryNote, date, tags } = req.body;
  const photo = await Photo.create({
    imageUrl: req.file.path,
    publicId: req.file.filename,
    caption,
    memoryNote,
    date: date ? new Date(date) : undefined,
    tags: tags ? tags.split(',').map((t) => t.trim()) : [],
  });
  res.status(201).json({ success: true, data: photo });
};

// PUT /api/photos/:id  (admin)
const updatePhoto = async (req, res) => {
  const { caption, memoryNote, date, tags, order } = req.body;
  const photo = await Photo.findByIdAndUpdate(
    req.params.id,
    { caption, memoryNote, date: date ? new Date(date) : undefined, tags, order },
    { new: true }
  );
  if (!photo) return res.status(404).json({ success: false, message: 'Photo not found' });
  res.json({ success: true, data: photo });
};

// DELETE /api/photos/:id  (admin)
const deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  if (!photo) return res.status(404).json({ success: false, message: 'Photo not found' });
  await cloudinary.uploader.destroy(photo.publicId);
  await photo.deleteOne();
  res.json({ success: true, message: 'Photo deleted' });
};

module.exports = { getPhotos, uploadPhoto, updatePhoto, deletePhoto };
