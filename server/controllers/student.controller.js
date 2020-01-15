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

exports.updateStudent = async (req, res) => {

    try {
        let student = await Student.findOne({id: req.body.id});
        student.ratings = req.body.ratings;
        student.parents = req.body.parents;
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.birthDate = req.body.birthDate;
        res.status(200).json(await student.save());
    } catch (err) {
        res.status(500).json(err);
    }
};
