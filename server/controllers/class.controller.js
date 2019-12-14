const uuid = require('uuid');
const Class = require('../models/class.model');

exports.getClassByTeacherId = async (req, res) => {

    try {
        let {teacherId} = req.params;
        let result = [];
        let allClass = await Class.find();
        allClass.forEach(item => {
            item.subjectTeachers.forEach(teacher => {

                if (teacher.id === teacherId) {
                    result = [...result, item]
                }
            })
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllClasses = async (req, res) => {

    try {
        res.status(200).json(await Class.find());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addClass = async (req, res) => {
    try {
        let newClass = new Class(req.body);
        newClass.id = uuid.v4();
        res.status(200).json(await newClass.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addStudent = async (req, res) => {
    try {

    } catch (err) {

    }
};

exports.addTeacher = async (req, res) => {
    try {

    } catch (err) {

    }
};
