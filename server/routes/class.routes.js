const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');
const isAuth = require('../middleware/is-auth');

router.get('/classes/students', isAuth, classController.getStudentsFromClasses);
router.get('/classes/teacher/students', isAuth, classController.getTeacherStudentsName);
router.get('/classes/teachers/name', isAuth, classController.getClassNameForTeachers);
router.get('/classes/students/name', isAuth, classController.getClassNameForStudents);
router.get('/class/teachers', isAuth, classController.getTeachersByClassName);
router.get('/classes/:teacherId', isAuth, classController.getClassByTeacherId);
router.get('/class/:id', isAuth, classController.getClassById);
router.get('/class', isAuth, classController.getAllClasses);
router.get('/class/principal/:id', isAuth, classController.getClassByIdForPrincipal);
router.post('/class', isAuth, classController.addClass);
router.put('/class/tutor', isAuth, classController.updateTutorClass);
router.put('/class', isAuth, classController.updateClass);
router.delete('/class/:id', isAuth, classController.deleteClassById);

module.exports = router;
