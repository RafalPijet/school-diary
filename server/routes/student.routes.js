const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const isAuth = require('../middleware/is-auth');

router.get('/students', isAuth, studentController.getAllStudents);
router.get('/students/onlyid', isAuth, studentController.getStudentsId);
router.get('/students/teacher', isAuth, studentController.getTeacherStudentsById);
router.get('/students/select', isAuth, studentController.getStudentsById);
router.get('/students/names', isAuth, studentController.getStudentsNames);
router.get('/students/:start/:limit', isAuth, studentController.getStudentsWithRange);
router.get('/student/:id', isAuth, studentController.getStudentById);
router.post('/student', isAuth, studentController.addStudent);
router.post('/student/subject', isAuth, studentController.addSubjectToStudent);
router.put('/student/parents/:id', isAuth, studentController.updateStudentParents);
router.put('/student/basic', isAuth, studentController.updateStudentBasicData);
router.delete('/student/:id', isAuth, studentController.deleteStudent);

module.exports = router;

