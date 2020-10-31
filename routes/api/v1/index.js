const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/event', require('./event'));

module.exports = router;
