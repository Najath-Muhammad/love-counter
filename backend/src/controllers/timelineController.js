const TimelineEvent = require('../models/TimelineEvent');

// GET /api/timeline
const getEvents = async (req, res) => {
  const events = await TimelineEvent.find().sort({ order: 1, date: 1 });
  res.json({ success: true, data: events });
};

// POST /api/timeline  (admin)
const createEvent = async (req, res) => {
  const { title, description, date, emoji, order } = req.body;
  const event = await TimelineEvent.create({ title, description, date, emoji, order });
  res.status(201).json({ success: true, data: event });
};

// PUT /api/timeline/:id  (admin)
const updateEvent = async (req, res) => {
  const event = await TimelineEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
  res.json({ success: true, data: event });
};

// DELETE /api/timeline/:id  (admin)
const deleteEvent = async (req, res) => {
  const event = await TimelineEvent.findById(req.params.id);
  if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
  await event.deleteOne();
  res.json({ success: true, message: 'Event deleted' });
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
