//1. import express
const express = require('express')

const userController = require('../Controllers/userController')
const projectController = require("../Controllers/projectController")
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//2. create router object of express to define path
const router = express.Router()

//3. Register api call
router.post('/register',userController.register)

//4. Login api call
router.post('/login',userController.login)

//5. add project api call
router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

// 6. Get all projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

// 7. Get A user Project
router.get('/project/view-projects',jwtMiddleware,projectController.getAProject)

// 8. Get home projects
router.get('/project/home-projects',projectController.getHomeProjects)

// 9. Delete user project
router.delete('/project/delete-user-project/:pid', jwtMiddleware, projectController.deleteUserProject)

// 10. Update user project
router.put('/project/update-user-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProject)

// 11. Get user Details
router.get('/user/user-details',jwtMiddleware,userController.getUserDetails)

module.exports = router