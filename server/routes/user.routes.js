const express = require('express');
const registerUser = require('../controllers/user.controller.js');

const router = express.Router()

router.route("/register").get(registerUser)

module.exports = router;