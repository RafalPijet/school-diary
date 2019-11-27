const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.route('/class/:teacherId').get(classController.getClassByTeacherId);
router.route('/class').get(classController.getAllClasses);

module.exports = router;
