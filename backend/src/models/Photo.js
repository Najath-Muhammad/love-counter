const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  caption: { type: String, default: '' },
  memoryNote: { type: String, default: '' },
  date: { type: Date },
  tags: [{ type: String }],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Photo', PhotoSchema);
