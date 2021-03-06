const express = require('express');
const router = express.Router();

router.use('/upload', require('./upload.js'));
router.use('/data', require('./data.js'));
router.use('/recent', require('./recent.js'));

module.exports = router;
