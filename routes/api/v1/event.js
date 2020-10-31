const express = require('express');
const router = express.Router();
const eventController = require('../../../controllers/api/v1/eventController');
const passport = require('passport');

router.post(
  '/addEvent/:userid',
  passport.authenticate('jwt', { session: false }),
  eventController.newEvent
);

module.exports = router;
