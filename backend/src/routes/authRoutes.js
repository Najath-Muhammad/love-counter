const express = require('express');
const router = express.Router();
const { login, setup } = require('../controllers/authController');

router.post('/login', login);
router.post('/setup', setup);
router.get('/setup', setup);  // also allow GET so browser can trigger it

module.exports = router;
