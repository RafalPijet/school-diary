const Student = require('../models/student.model');
const uuid = require('uuid');
const validator = require('validator');

exports.getStudentById = async (req, res, next) => {

    try {
        const {id} = req.params;
        let student = await Student.findOne({id});

        if (!student) {
            const error = new Error("Couldn't find some student");
            error.statusCode = 401;
            throw error;
        }
        let selectedStudent = {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            birthDate: student.birthDate,
            parents: student.parents.map(parent => parent.id)
        };
        res.status(200).json(selectedStudent);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getStudentsById = async (req, res, next) => {

    try {
        const {studentsId} = req.query;
        let result = await Student.find({id: studentsId});

        if (!result.length) {
            const error = new Error("Couldn't find any students");
            error.statusCode = 401;
            throw error;
        }
        result = result.map(student => {
            student.ratings = [];
            student.parents = [];
            return student;
        });
        res.status(200).json(result);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
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
            };
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
            result = [...result, students[i]];
        }
        let selectedStudents = result.slice(start, start + limit);
        selectedStudents = selectedStudents.map(student => {
            return {
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                birthDate: student.birthDate,
                parents: student.parents.map(parent => parent.id)
            };
        });
        res.status(200).json(selectedStudents);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getTeacherStudentsById = async (req, res, next) => {
    
    try {
        const {studentsId} = req.query;
        let students = await Student.find({id: studentsId});

        if (!students.length) {
            const error = new Error("Couldn't find any students");
            error.statusCode = 401;
            throw error;
        }
        let result = students.map(student => {
            return {
                id: student.id,
                birthDate: student.birthDate,
                parents: student.parents.map(parent => {
                    return {
                        name: `${parent.lastName} ${parent.firstName}`,
                        phone: parent.telephone,
                        email: parent.email
                    };
                })
            };
        });
        res.status(200).json(result);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addStudent = async (req, res, next) => {
    const student = req.body;
    const errors = [];

    if (validator.isEmpty(student.lastName) || !validator.isLength(student.lastName, { min: 5 })) {
        errors.push({ message: "Lastname too short! You must enter min. 5 signs" });
    }

    if (validator.isEmpty(student.firstName) || !validator.isLength(student.firstName, { min: 5 })) {
        errors.push({ message: "Firstname too short! You must enter min. 5 signs" });
    }

    if (!validator.isDate(student.birthDate.substring(0, 10))) {
        errors.push({ message: "Wrong date format" });
    }
    
    try {

        if (errors.length) {
            const error = new Error('Validation failed: ');
            error.data = errors;
            error.statusCode = 422;
            throw error;
        }
        let newStudent = new Student(student);
        newStudent.id = uuid.v4();
        res.status(200).json(await newStudent.save());
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateStudentParents = async (req, res, next) => {

    try {
        const {id} = req.params;
        const {parent, isAdd} = req.body;
        let student = await Student.findOne({id});

        if (!student) {
            const error = new Error("Couldn't find some student");
            error.statusCode = 401;
            throw error;
        }

        if (isAdd) {
            student.parents = [...student.parents, parent];
        } else {
            student.parents = await student.parents.filter(item => item.id !== parent.id);
        }
        await student.save();
        res.status(200).json({studentId: student.id});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateStudentBasicData = async (req, res, next) => {
    const {id, firstName, lastName, birthDate} = req.body;
    const errors = [];

    if (validator.isEmpty(lastName) || !validator.isLength(lastName, { min: 3 })) {
        errors.push({ message: "Lastname too short! You must enter min. 3 signs" });
    }

    if (validator.isEmpty(firstName) || !validator.isLength(firstName, { min: 3 })) {
        errors.push({ message: "Firstname too short! You must enter min. 3 signs" });
    }

    if (!validator.isDate(birthDate.substring(0, 10))) {
        errors.push({ message: "Wrong date format" });
    }

    try {

        if (errors.length) {
            const error = new Error('Validation failed: ');
            error.data = errors;
            error.statusCode = 422;
            throw error;
        }
        let student = await Student.findOne({id});

        if (!student) {
            const error = new Error("Couldn't find some student");
            error.statusCode = 401;
            throw error;
        }
        student.firstName = firstName;
        student.lastName = lastName;
        student.birthDate = birthDate;
        await student.save();
        res.status(200).json({studentName: `${student.firstName} ${student.lastName}`});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addSubjectToStudent = async (req, res, next) => {

    try {
        const {id, rating} = req.body;
        let student = await Student.findOne({id});

        if (!student) {
            const error = new Error("Couldn't find some student");
            error.statusCode = 401;
            throw error;
        }
        student.ratings = [...student.ratings, rating];
        res.status(200).json(await student.save());
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteStudent = async (req, res, next) => {

    try {
        let student = await Student.findOne({id: req.params.id});

        if (!student) {
            const error = new Error("Couldn't find student to remove");
            error.statusCode = 401;
            throw error;
        }
        await student.remove();
        res.status(200).json({
            studentName: `${student.lastName} ${student.firstName}`,
            ratings: student.ratings.map(rating => rating.id)
        });
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
