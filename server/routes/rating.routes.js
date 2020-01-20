const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.route('/ratings/:id').post(ratingController.addNewRatingById);
router.route('/rating/:id').delete(ratingController.deleteRating);

module.exports = router;
