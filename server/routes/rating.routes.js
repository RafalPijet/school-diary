const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');
const isAuth = require('../middleware/is-auth');

router.post('/rating', isAuth, ratingController.addNewRating);
router.post('/ratings/:id', isAuth, ratingController.addNewRatingById);
router.put('/ratings/:id', isAuth, ratingController.updateRatingById);
router.delete('/ratings/:id/:_id', isAuth, ratingController.deleteRatingById);
router.delete('/ratings', isAuth, ratingController.deleteRating);

module.exports = router;
