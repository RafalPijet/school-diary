const Class = require('../models/class.model');

exports.getClassByTeacherId = async (req, res) => {

    try {
        let {teacherId} = req.params;
        let allClass = await Class.find();
        console.log(allClass);
        res.status(200).json()
    } catch (err) {
        res.status(500).json(err);
    }
};
