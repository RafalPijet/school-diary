const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.route('/rating').post(ratingController.addNewRating);
router.route('/ratings/:id').post(ratingController.addNewRatingById);
router.route('/ratings/:id').put(ratingController.updateRatingById);
router.route('/rating/:id').delete(ratingController.deleteRating);

module.exports = router;
