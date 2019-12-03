const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.route('/class/:teacherId').get(classController.getClassByTeacherId);
router.route('/class').get(classController.getAllClasses);
router.route('/class').post(classController.addClass);

module.exports = router;
