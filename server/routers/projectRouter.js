const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/projectController');
const authController = require('./../controllers/authController')

//Create and Get Projects
router.get('/', authController.protect, projectController.getAllProjects);
router.post('/',authController.protect, projectController.createProject);
router.get('/:id',projectController.getProject);

//Create, Get and Delete Tasks
router.get('/:id/tasks',authController.protect , projectController.getAllTask);
router.post('/:id/tasks',authController.protect , projectController.createProjectTask);
router.put('/:id/tasks/:taskId', projectController.updateTaskPercentage);
router.delete('/:id/tasks/:deleteId',projectController.removeTask);

//Add and Remove Members
router.put('/:id/member',projectController.addMembers);
router.put('/:id/member/:email',projectController.removeMember);

module.exports = router;
