const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.route('/users/login').get(userController.getUserByLogin);
router.route('/users').post(userController.addUser);
router.route('/users').put(userController.updateUser);
router.route('/users/parent/:id').put(userController.updateParentStudents);
router.route('/users/:id').delete(userController.deleteUser);
router.route('/users/teachers').get(userController.getTeachers);
router.route('/users/:status/:start/:limit').get(userController.getUsers);
router.route('/users/name/:status').get(userController.getUsersName);
router.route('/users/:status/:id').get(userController.getUserById);

module.exports = router;
