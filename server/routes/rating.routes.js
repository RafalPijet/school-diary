const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');

router.post('/rating', ratingController.addNewRating);
router.post('/ratings/:id', ratingController.addNewRatingById);
router.put('/ratings/:id', ratingController.updateRatingById);
router.delete('/ratings/:id/:_id', ratingController.deleteRatingById);
router.delete('/ratings', ratingController.deleteRating);

module.exports = router;
