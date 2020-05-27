const Student = require('../models/student.model');
const uuid = require('uuid');

exports.getStudentsById = async (req, res) => {

    try {
        const {studentsId} = req.query;
        let result = await Student.find({id: studentsId});
        result = result.map(student => {
            student.ratings = [];
            student.parents = [];
            return student;
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllStudents = async (req, res) => {

    try {
        let result = await Student.find();
        result = result.map(item => {
            item.ratings = [];
            item.parents = [];
            return item;
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getStudentsId = async (req, res) => {

    try {
        let result = await Student.find();
        result = result.map(item => item.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getStudentsWithRange = async (req, res) => {

    try {
        let {start, limit} = req.params;
        start = parseInt(start);
        limit = parseInt(limit);
        let students = await Student.find();
        let amount = await Student.countDocuments();
        let result = [];

        for (let i = students.length - 1; i > -1; i--) {
            result = [...result, students[i]]
        }
        let selectedStudents = students.slice(start, start + limit);
        selectedStudents = selectedStudents.map(student => {
            return {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                birthDate: student.birthDate,
                parents: student.parents.map(parent => parent.id)
            }
        });
        res.status(200).json({
            selectedStudents,
            amount
        });
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

exports.addSubjectToStudent = async (req, res) => {

    try {
        const {id, rating} = req.body;
        let student = await Student.findOne({id});
        student.ratings = [...student.ratings, rating];
        res.status(200).json(await student.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteStudent = async (req, res) => {

    try {
        let student = await Student.findOne({id: req.params.id});
        res.status(200).json(student.remove());
    } catch (err) {
        res.status(500).json(err);
    }
};
