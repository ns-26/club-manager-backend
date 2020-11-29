const express = require('express');

const router = express.Router();

const middleware = require('../../../config/middleware');

const pollController = require('../../../controllers/api/v1/pollController');

const passport = require('passport');

router.post(
  '/create/:id',
  passport.authenticate('jwt', { failWithError: true, session: false }),
  middleware.handleError,
  pollController.createPoll
);

module.exports = router;
