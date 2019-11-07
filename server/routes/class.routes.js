const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.route('/class/:teacherId').get(classController.getClassByTeacherId);

module.exports = router;
