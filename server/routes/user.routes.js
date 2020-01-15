const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.route('/users/login').get(userController.getUserByLogin);
router.route('/users').post(userController.addUser);
router.route('/users').put(userController.updateUser);
router.route('/users/teachers').get(userController.getTeachers);
router.route('/users/parents').get(userController.getParents);

module.exports = router;
