const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/event', require('./event'));
router.use('/home', require('./home'));

module.exports = router;
