const express = require('express');
const toDoController = require('./../controllers/toDoController');
const authController = require('./../controllers/authController')

const router = express.Router();

router.get('/',authController.protect, toDoController.getAllTasks);
router.post('/',authController.protect,toDoController.createTask);
router.delete('/:id',toDoController.deleteTask);
router.put('/:id',toDoController.updateStatus);

module.exports = router;