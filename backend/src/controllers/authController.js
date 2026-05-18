const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Please provide email and password' });

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password)))
    return res.status(401).json({ success: false, message: 'Invalid credentials' });

  res.json({ success: true, token: generateToken(admin._id), admin: { email: admin.email } });
};

// POST /api/auth/setup  (one-time admin seed)
const setup = async (req, res) => {
  const exists = await Admin.findOne({});
  if (exists) return res.status(400).json({ success: false, message: 'Admin already set up' });

  const admin = await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  });
  res.status(201).json({ success: true, message: 'Admin created', email: admin.email });
};

module.exports = { login, setup };
