const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/users/login', userController.getUserByLogin);
router.post('/users', userController.addUser);
router.put('/users', userController.updateUser);
router.put('/users/parent/:id', userController.updateParentStudents);
router.delete('/users/:id', userController.deleteUser);
router.get('/users/teachers', userController.getTeachers);
router.get('/users/:status/:start/:limit', userController.getUsers);
router.get('/users/name/:status', userController.getUsersName);
router.get('/users/:status/:id', userController.getUserById);

module.exports = router;
