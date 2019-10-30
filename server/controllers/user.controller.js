const User = require('../models/user.model');

exports.getUserByLogin = async (req, res) => {

    try {
        res.status(200).json(await User.findOne({"email": req.query.email}));
    } catch (err) {
        res.status(500).json(err);
    }
};
