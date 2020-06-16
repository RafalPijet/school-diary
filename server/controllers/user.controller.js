const uuid = require('uuid');
const User = require('../models/user.model');

exports.getUserByLogin = async (req, res) => {

    try {
        res.status(200).json(await User.findOne({"email": req.query.email}));
    } catch (err) {
        res.status(500).json(err);
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
        let result = '';

        if (isPassword) {

            if (user.password === userAfterChange.password) {
                user.password = userAfterChange.newPassword;
                result = 'The password has been changed. '
            } else {
                result = 'Wrong old password.'
            }
        }

        if (isDataChange) {
            user.firstName = userAfterChange.firstName;
            user.lastName = userAfterChange.lastName;
            user.email = userAfterChange.email;
            user.telephone = userAfterChange.telephone;
            result = result + `${userAfterChange.lastName} ${userAfterChange.firstName} data has been changed.`
        }
        // await user.save();
        res.status(200).json(result);
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
                }
            })
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
            result = [...result, users[i]]
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
            }
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
            }
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};
