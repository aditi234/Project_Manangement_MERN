const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.patch('/updateMe',authController.protect, userController.updateMe);
router.patch('/updateMypassword', authController.protect, authController.updatePassword);

router.get('/', authController.protect ,userController.getAllUsers);

module.exports = router;