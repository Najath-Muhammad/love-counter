require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const letterRoutes = require('./routes/letterRoutes');

connectDB();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/letter', letterRoutes);

app.get('/', (req, res) => res.json({ message: '💕 Love Counter API is running' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`💕 Server running on port ${PORT}`));
