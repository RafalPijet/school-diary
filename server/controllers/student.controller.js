const Student = require('../models/student.model');
const uuid = require('uuid');

exports.getAllStudents = async (req, res) => {

    try {
        res.status(200).json(await Student.find());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addStudent = async (req, res) => {

    try {
        let newStudent = new Student(req.body);
        newStudent.id = uuid.v4();
        res.status(200).json(await newStudent.save());
    } catch (err) {
        res.status(500).json(err);
    }
};
