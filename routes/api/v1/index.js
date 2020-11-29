const express = require('express');

const router = express.Router();

router.use('/users', require('./users'));

router.use('/event', require('./event'));

router.use('/home', require('./home'));

router.use('/comment', require('./comment'));

module.exports = router;
