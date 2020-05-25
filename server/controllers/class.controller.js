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
        result = result.map(item => ({id: item.id, name: item.name}));
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getClassById = async (req, res) => {

    try {
        let {id} = req.params;
        res.status(200).json(await Class.findOne({id}));
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getClassByIdForPrincipal = async (req, res) => {

    try {
        let {id} = req.params;
        let classItem = await Class.findOne({id});
        let result = {
            students: classItem.students.map(student => {
                student.ratings = [];
                student.parents = [];
                return student
            }),
            subjectTeachers: classItem.subjectTeachers.map(teacher => ({
                id: teacher.id,
                _id: teacher._id,
                subject: teacher.subject,
                firstName: teacher.firstName,
                lastName: teacher.lastName
            }))
        };
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllClasses = async (req, res) => {

    try {
        let result = await Class.find();
        result = result.map(item => {
            item.students = [];
            item.subjectTeachers = [];
            item.mainTeacher = {id: item.mainTeacher.id};
                return item
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getStudentsFromClasses = async (req, res) => {

    try {
        let result = await Class.find();
        result = result.map(item => {
            return item.students.map(student => student.id);
        });
        let studentsId = Array.prototype.concat(...result);
        res.status(200).json(studentsId);
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

exports.updateTutorClass = async (req, res) => {

    try {
        let selectedClass = await Class.findOne({id: req.body.id});
        selectedClass.mainTeacher = req.body.mainTeacher;
        let savedClass = await selectedClass.save();
        res.status(200).json({
            mainTeacher: savedClass.mainTeacher,
            name: savedClass.name
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateClass = async (req, res) => {

    try {
        let {id, isStudents, students, subjectTeachers} = req.body;
        let selectedClass = await Class.findOne({id});
        isStudents ? selectedClass.students = students : selectedClass.subjectTeachers = subjectTeachers;
        await selectedClass.save();
        res.status(200).json(selectedClass.name);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteClassById = async (req, res) => {

    try {
        const {id} = req.params;
        let classItem = await Class.findOne({id});
        classItem.remove();
        res.status(200).json({name: classItem.name})
    } catch (err) {
        res.status(500).json(err);
    }
};
