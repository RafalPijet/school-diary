const Student = require('../models/student.model');
const uuid = require('uuid');

exports.getStudentById = async (req, res) => {

    try {
        const {id} = req.params;
        let student = await Student.findOne({id});
        let selectedStudent = {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            birthDate: student.birthDate,
            parents: student.parents.map(parent => parent.id)
        };
        res.status(200).json(selectedStudent);
    } catch (err) {
        res.status(500).json(err);
    }
};

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

exports.getStudentsNames = async (req, res) => {

    try {
        let result = await Student.find();
        result = result.map(item => {
            return {
                id: item.id,
                name: `${item.lastName} ${item.firstName}`
            }
        });
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

        let result = [];

        for (let i = students.length - 1; i > -1; i--) {
            result = [...result, students[i]]
        }
        let selectedStudents = result.slice(start, start + limit);
        selectedStudents = selectedStudents.map(student => {
            return {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                birthDate: student.birthDate,
                parents: student.parents.map(parent => parent.id)
            }
        });
        res.status(200).json(selectedStudents);
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

exports.updateStudentBasicData = async (req, res) => {

    try {
        const {id, firstName, lastName, birthDate} = req.body;
        let student = await Student.findOne({id});
        student.firstName = firstName;
        student.lastName = lastName;
        student.birthDate = birthDate;
        await student.save();
        res.status(200).json({studentName: `${student.firstName} ${student.lastName}`});
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
        await student.remove();
        res.status(200).json({
            studentName: `${student.lastName} ${student.firstName}`,
            ratings: student.ratings.map(rating => rating.id)
        });
    } catch (err) {
        res.status(500).json(err);
    }
};
