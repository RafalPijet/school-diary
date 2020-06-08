const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.route('/users/login').get(userController.getUserByLogin);
router.route('/users').post(userController.addUser);
router.route('/users/parent/:id').put(userController.updateParentStudents);
router.route('/users/:id').delete(userController.deleteUser);
router.route('/users/teachers').get(userController.getTeachers);
router.route('/users/parents/:start/:limit').get(userController.getParents);
router.route('/users/parents/name').get(userController.getParentsName);
router.route('/users/parent/:id').get(userController.getParentById);

module.exports = router;
