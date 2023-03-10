const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

/**
 * Routes for signup and login into our API
 */
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;