const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.route('/students').get(studentController.getAllStudents);
router.route('/students/onlyid').get(studentController.getStudentsId);
router.route('/students/teacher').get(studentController.getTeacherStudentsById);
router.route('/students/select').get(studentController.getStudentsById);
router.route('/students/names').get(studentController.getStudentsNames);
router.route('/students/:start/:limit').get(studentController.getStudentsWithRange);
router.route('/student/:id').get(studentController.getStudentById);
router.route('/student').post(studentController.addStudent);
router.route('/student/subject').post(studentController.addSubjectToStudent);
router.route('/student/parents/:id').put(studentController.updateStudentParents);
router.route('/student/basic').put(studentController.updateStudentBasicData);
router.route('/student/:id').delete(studentController.deleteStudent);

module.exports = router;

