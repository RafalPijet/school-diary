const Student = require('../models/student.model');

exports.getAllStudents = async (req, res) => {

    try {
        res.status(200).json(await Student.find());
    } catch (err) {
        res.status(500).json(err);
    }
};
