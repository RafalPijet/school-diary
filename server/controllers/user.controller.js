const uuid = require('uuid');
const cryptoJS = require('crypto-js');
const User = require('../models/user.model');

exports.getUserByLogin = async (req, res, next) => {

    try {
        let user = await User.findOne({"email": req.query.email});

        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }

        if (user.status === 'parent') {
            user.students = user.students.map(student => {
                student.parents = [];
                return student;
            });
        }
        res.status(200).json(user);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addUser = async (req, res) => {

    try {
        let user = await new User(req.body);
        user.id = uuid.v4();
        res.status(200).json(await user.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateParentStudents = async (req, res) => {

    try {
        const {id} = req.params;
        const {studentsList} = req.body;
        let user = await User.findOne({id});
        user.students = studentsList;
        await user.save();
        res.status(200).json({id: user.id});
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateUser = async (req, res) => {

    try {
        const {isPassword, isDataChange, userAfterChange} = req.body;
        let user = await User.findOne({id: userAfterChange.id});
        let resultData = '';
        let resultPassword = null;

        if (isPassword) {
            let dbUserPassword = cryptoJS.AES.decrypt(user.password, 'secret key 220473').toString(cryptoJS.enc.Utf8);
            let changeUserPassword = cryptoJS.AES.decrypt(userAfterChange.password, 'secret key 220473').toString(cryptoJS.enc.Utf8);

            if (dbUserPassword === changeUserPassword) {
                user.password = userAfterChange.newPassword;
                resultPassword = 'The password has been changed. ';
            }
        }

        if (isDataChange) {
            user.firstName = userAfterChange.firstName;
            user.lastName = userAfterChange.lastName;
            user.email = userAfterChange.email;
            user.telephone = userAfterChange.telephone;
            resultData = `${userAfterChange.lastName} ${userAfterChange.firstName} data has been changed.`;
        }
        await user.save();
        res.status(200).json({resultData, resultPassword});
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteUser = async (req, res) => {

    try {
        let user = await User.findOne({id: req.params.id});
        user.remove();
        res.status(200).json({name: `${user.lastName} ${user.firstName}`});
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getTeachers = async (req, res) => {

    try {
        let teachers = await User.find({status: 'teacher'});
        teachers = teachers.map(teacher => {
            return {
                _id: teacher._id,
                id: teacher.id,
                subject: teacher.subject,
                lastName: teacher.lastName,
                firstName: teacher.firstName
            };
        });
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUserById = async (req, res) => {

    try {
        const {id, status} = req.params;
        let user = await User.findOne({id});
        let result = {
            id: user.id,
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telephone: user.telephone,
        };

        if (status === 'parent') {
            result.students = user.students.map(student => {
                return {
                    id: student.id,
                    _id: student._id,
                    birthDate: student.birthDate,
                    firstName: student.firstName,
                    lastName: student.lastName
                };
            });
        } else {
            result.subject = user.subject;
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUsers = async (req, res) => {

    try {
        let {start, limit, status} = req.params;
        start = parseInt(start);
        limit = parseInt(limit);
        let users = await User.find({status});
        let result = [];
        for (let i = users.length - 1; i > -1; i--) {
            result = [...result, users[i]];
        }
        let selectedUsers = result.slice(start, start + limit);
        selectedUsers = await selectedUsers.map(user => {
            return {
                id: user.id,
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                telephone: user.telephone,
                [status === 'parent' ? 'students' : 'subject']: status === 'parent' ? user.students : user.subject,
            };
        });
        res.status(200).json(selectedUsers);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUsersName = async (req, res) => {

    try {
        const {status} = req.params;
        let users = await User.find({status});
        users = users.map(user => {
            return {
                id: user.id,
                name: `${user.lastName} ${user.firstName}`
            };
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};
