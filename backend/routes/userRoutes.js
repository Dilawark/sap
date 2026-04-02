const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController')

router.route('/users')
  .post(usersController.createNewUser);
router.route('/login')
  .post(usersController.authUser);

module.exports = router