const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.route('/students').get(studentController.getAllStudents);
router.route('/student').post(studentController.addStudent);
router.route('/student').put(studentController.updateStudent);

module.exports = router;

