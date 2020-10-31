const express = require('express');
const router = express.Router();

const userController = require('../../../controllers/api/v1/userController');

router.post('/login', userController.login);

router.post('/register', userController.create);

module.exports = router;
