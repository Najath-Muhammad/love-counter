const LoveLetter = require('../models/LoveLetter');

// GET /api/letter (public - active letter)
const getLetter = async (req, res) => {
  const letter = await LoveLetter.findOne({ isActive: true }).sort({ updatedAt: -1 });
  res.json({ success: true, data: letter });
};

// POST /api/letter  (admin)
const createLetter = async (req, res) => {
  const { title, content, author } = req.body;
  // Deactivate existing letters
  await LoveLetter.updateMany({}, { isActive: false });
  const letter = await LoveLetter.create({ title, content, author, isActive: true });
  res.status(201).json({ success: true, data: letter });
};

// PUT /api/letter/:id  (admin)
const updateLetter = async (req, res) => {
  const letter = await LoveLetter.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );
  if (!letter) return res.status(404).json({ success: false, message: 'Letter not found' });
  res.json({ success: true, data: letter });
};

// GET /api/letter/all  (admin)
const getAllLetters = async (req, res) => {
  const letters = await LoveLetter.find().sort({ createdAt: -1 });
  res.json({ success: true, data: letters });
};

module.exports = { getLetter, createLetter, updateLetter, getAllLetters };
