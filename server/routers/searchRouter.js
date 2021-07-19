const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const searchController = require('./../controllers/searchController');

router.post('/', authController.protect, searchController.searchTasks);

module.exports = router