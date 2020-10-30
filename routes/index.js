const express = require('express');
const router = express.Router();

//Users route
router.use('/users', require('./users'));
//posts route
router.use('/posts', require('./posts'));

//setting up api section
router.use('/api', require('./api'));

module.exports = router;
