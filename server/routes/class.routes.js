const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.route('/classes/students').get(classController.getStudentsFromClasses);
router.route('/classes/:teacherId').get(classController.getClassByTeacherId);
router.route('/class/:id').get(classController.getClassById);
router.route('/class').get(classController.getAllClasses);
router.route('/class/principal/:id').get(classController.getClassByIdForPrincipal);
router.route('/class').post(classController.addClass);
router.route('/class/tutor').put(classController.updateTutorClass);
router.route('/class').put(classController.updateClass);
router.route('/class/student').post(classController.addStudent);
router.route('/class/teacher').post(classController.addTeacher);
router.route('/class/:id').delete(classController.deleteClassById);

module.exports = router;
