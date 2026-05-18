const mongoose = require('mongoose');

const TimelineEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  emoji: { type: String, default: '💕' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TimelineEvent', TimelineEventSchema);
