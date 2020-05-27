const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.route('/students').get(studentController.getAllStudents);
router.route('/students/onlyid').get(studentController.getStudentsId);
router.route('/students/select').get(studentController.getStudentsById);
router.route('/students/:start/:limit').get(studentController.getStudentsWithRange);
router.route('/student').post(studentController.addStudent);
router.route('/student/subject').post(studentController.addSubjectToStudent);
router.route('/student').put(studentController.updateStudent);
router.route('/student/:id').delete(studentController.deleteStudent);

module.exports = router;

