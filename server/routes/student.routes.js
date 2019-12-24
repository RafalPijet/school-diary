const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.route('/students').get(studentController.getAllStudents);
router.route('/student').post(studentController.addStudent);

module.exports = router;

