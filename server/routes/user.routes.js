const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAuth = require('../middleware/is-auth');

router.post('/users/login', userController.userByLogin);
router.post('/users', userController.addUser);
router.put('/users', isAuth, userController.updateUser);
router.put('/users/parent/:id', isAuth, userController.updateParentStudents);
router.delete('/users/:id', isAuth, userController.deleteUser);
router.get('/user/:userId', isAuth, userController.userById);
router.get('/users/teachers', isAuth, userController.getTeachers);
router.get('/users/:status/:start/:limit', isAuth, userController.getUsers);
router.get('/users/name/:status', isAuth, userController.getUsersName);
router.get('/users/:status/:id', isAuth, userController.getUserById);

module.exports = router;
