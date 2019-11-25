const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.route('/ratings/:id').post(ratingController.addNewRatingById);

module.exports = router;
