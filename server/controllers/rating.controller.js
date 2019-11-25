const Rating = require('../models/rating.model');

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
