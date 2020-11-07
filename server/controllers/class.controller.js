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
                    result = [...result, item];
                }
            });
        });
        result = result.map(item => ({id: item.id, name: item.name}));
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getClassById = async (req, res, next) => {

    try {
        let {id} = req.params;
        let classItem = await Class.findOne({id});

        if (!classItem) {
            const error = new Error("Couldn't find class");
            error.statusCode = 401;
            throw error;
        }
        let result = {
            _id: classItem._id,
            id: classItem.id,
            name: classItem.name,
            mainTeacher: {
                id: classItem.mainTeacher.id,
                lastName: classItem.mainTeacher.lastName,
                firstName: classItem.mainTeacher.firstName,
                email: classItem.mainTeacher.email
            },
            students: classItem.students.map(student => {
                student.parents = [];
                student.birthDate = null;
                return student;
            })
        };
        res.status(200).json(result);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getClassByIdForPrincipal = async (req, res, next) => {

    try {
        let {id} = req.params;
        let classItem = await Class.findOne({id});

        if (!classItem) {
            const error = new Error("Couldn't find a class");
            error.statusCode = 401;
            throw error;
        }
        let result = {
            students: classItem.students.map(student => {
                student.ratings = [];
                student.parents = [];
                return student;
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
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllClasses = async (req, res) => {

    try {
        let result = await Class.find();
        result = result.map(item => {
            item.students = [];
            item.subjectTeachers = [];
            item.mainTeacher = {id: item.mainTeacher.id};
            return item;
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

exports.getClassNameForStudents = async (req, res) => {

    try {
        const {studentsId} = req.query;
        let classes = await Class.find();
        let result = [];
        await classes.forEach(classItem => {
            classItem.students.forEach(student => {

                if (studentsId.includes(student.id)) {
                    result = [...result, {id: student.id, name: classItem.name}];
                }
            });
        });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getClassNameForTeachers = async (req, res) => {

    try {
        const {teachersId} = req.query;
        let classes = await Class.find();
        let teachersInClass = [];
        let tutors = [];
        await classes.forEach(classItem => {

            if (teachersId.includes(classItem.mainTeacher.id)) {
                tutors = [...tutors, {
                    tutorId: classItem.mainTeacher.id,
                    tutorClass: classItem.name
                }];
            }
            classItem.subjectTeachers.forEach(teacher => {

                if (teachersId.includes(teacher.id)) {
                    teachersInClass = [...teachersInClass, {
                        id: teacher.id,
                        className: classItem.name,
                        studentsAmount: classItem.students.length
                    }];
                }
            });
        });
        res.status(200).json({tutors, teachersInClass});
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

exports.updateTutorClass = async (req, res, next) => {

    try {
        let selectedClass = await Class.findOne({id: req.body.id});

        if (!selectedClass) {
            const error = new Error("Couldn't find a tutor class.");
            error.statusCode = 401;
            throw error;
        }
        selectedClass.mainTeacher = req.body.mainTeacher;
        let savedClass = await selectedClass.save();
        res.status(200).json({
            mainTeacher: savedClass.mainTeacher,
            name: savedClass.name
        });
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateClass = async (req, res, next) => {

    try {
        let {id, isStudents, students, subjectTeachers} = req.body;
        let selectedClass = await Class.findOne({id});

        if (!selectedClass) {
            const error = new Error("Couldn't find a class.");
            error.statusCode = 401;
            throw error;
        }
        isStudents ? selectedClass.students = students : selectedClass.subjectTeachers = subjectTeachers;
        await selectedClass.save();
        res.status(200).json(selectedClass.name);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteClassById = async (req, res, next) => {

    try {
        const {id} = req.params;
        let classItem = await Class.findOne({id});

        if (!classItem) {
            const error = new Error("Couldn't find a class.");
            error.statusCode = 401;
            throw error;
        }
        classItem.remove();
        res.status(200).json({name: classItem.name});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTeacherStudentsName = async (req, res, next) => {

    try {
        const {classesId} = req.query;
        let result = [];
        let teacherClasses = await Class.find({id: classesId});
        
        if (!teacherClasses.length) {
            const error = new Error("Couldn't find teacher classes");
            error.statusCode = 401;
            throw error;
        }
        teacherClasses.forEach(classItem => {
            classItem.students.forEach(student => {
                let item = {
                    id: student.id,
                    name: `${student.lastName} ${student.firstName}`,
                    className: classItem.name
                };
                result = [...result, item];
            });
        });
        res.status(200).json(result);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTeachersByClassName = async (req, res, next) => {

    try {
        const {name} = req.query;
        let classItem = await Class.findOne({name});

        if (!classItem) {
            const error = new Error("Couldn't find a teachers by class name");
            error.statusCode = 401;
            throw error;
        }
        let result = {
            id: classItem.id,
            _id: classItem._id,
            name: classItem.name,
            tutor: {
                name: `${classItem.mainTeacher.lastName} ${classItem.mainTeacher.firstName}`,
                subject: classItem.mainTeacher.subject,
                phone: classItem.mainTeacher.telephone,
                email: classItem.mainTeacher.email
            },
            teachers: classItem.subjectTeachers.map(teacher => {
                return {
                    name: `${teacher.lastName} ${teacher.firstName}`,
                    subject: teacher.subject,
                    phone: teacher.telephone,
                    email: teacher.email
                };
            }),
            studentsAmount: classItem.students.length
        };
        res.status(200).json(result);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
