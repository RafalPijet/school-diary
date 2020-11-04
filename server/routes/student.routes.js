const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/students', studentController.getAllStudents);
router.get('/students/onlyid', studentController.getStudentsId);
router.get('/students/teacher', studentController.getTeacherStudentsById);
router.get('/students/select', studentController.getStudentsById);
router.get('/students/names', studentController.getStudentsNames);
router.get('/students/:start/:limit', studentController.getStudentsWithRange);
router.get('/student/:id', studentController.getStudentById);
router.post('/student', studentController.addStudent);
router.post('/student/subject', studentController.addSubjectToStudent);
router.put('/student/parents/:id', studentController.updateStudentParents);
router.put('/student/basic', studentController.updateStudentBasicData);
router.delete('/student/:id', studentController.deleteStudent);

module.exports = router;

