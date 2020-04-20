const Rating = require('../models/rating.model');
const uuid = require('uuid');

exports.addNewRating = async (req, res) => {

    try {
        let rating = new Rating();
        rating.id = uuid.v4();
        rating.studentId = req.body.studentId;
        rating.subject = req.body.subject;
        res.status(200).json(await rating.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addNewRatingById = async (req, res) => {

    try {
        const {id} = req.params;
        let rating = await Rating.findOne({"id": id});
        rating.ratings = [...rating.ratings, req.body];
        res.status(200).json(await rating.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateRatingById = async (req, res) => {

    try {
        const {id} = req.params;
        let rating = await Rating.findOne({"id": id});
        rating.ratings = rating.ratings.map(item => {
            return (item._id.toString() === req.body._id) ? req.body : item;
        });
        res.status(200).json(await rating.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteRating = async (req, res) => {

    try {
        res.status(200).json(await Rating.findOneAndDelete({id: req.params.id}))
    } catch (err) {
        res.status(500).json(err);
    }
};
