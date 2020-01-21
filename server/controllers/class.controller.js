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
        let selectedClass = await Class.findOne({id: req.body.classId});
        selectedClass.students = [...selectedClass.students, req.body.user];
        res.status(200).json(await selectedClass.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.addTeacher = async (req, res) => {
    
    try {
        let selectedClass = await Class.findOne({id: req.body.classId});
        selectedClass.subjectTeachers = [...selectedClass.subjectTeachers, req.body.user];
        res.status(200).json(await selectedClass.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateClass = async (req, res) => {
    
    try {
        let selectedClass = await Class.findOne({id: req.body.id});
        selectedClass.name = req.body.name;
        selectedClass.mainTeacher = req.body.mainTeacher;
        selectedClass.students = req.body.students;
        selectedClass.subjectTeachers = req.body.subjectTeachers;
        res.status(200).json(await selectedClass.save());
    } catch (err) {
        res.status(500).json(err);
    }
};
