const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.get('/classes/students', classController.getStudentsFromClasses);
router.get('/classes/teacher/students', classController.getTeacherStudentsName);
router.get('/classes/teachers/name', classController.getClassNameForTeachers);
router.get('/classes/students/name', classController.getClassNameForStudents);
router.get('/class/teachers', classController.getTeachersByClassName);
router.get('/classes/:teacherId', classController.getClassByTeacherId);
router.get('/class/:id', classController.getClassById);
router.get('/class', classController.getAllClasses);
router.get('/class/principal/:id', classController.getClassByIdForPrincipal);
router.post('/class', classController.addClass);
router.put('/class/tutor', classController.updateTutorClass);
router.put('/class', classController.updateClass);
router.post('/class/student', classController.addStudent);
router.post('/class/teacher', classController.addTeacher);
router.delete('/class/:id', classController.deleteClassById);

module.exports = router;
