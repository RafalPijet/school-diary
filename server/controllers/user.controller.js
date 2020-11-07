const uuid = require('uuid');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.model');

exports.userByLogin = async (req, res, next) => {

    const {email, password} = req.body;

    try {
        let user = await User.findOne({"email": email});

        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }

        let decrypted = cryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(cryptoJS.enc.Utf8);
    
        if (decrypted !== password) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        if (user.status === 'parent') {
            user.students = user.students.map(student => {
                student.parents = [];
                return student;
            });
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, process.env.PRIVATE_KEY, {expiresIn: '1h'});
        res.status(200).json({user, token});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.addUser = async (req, res) => {
    let newUser = req.body;
    
    try {
        newUser.password = cryptoJS.AES.encrypt(newUser.password, process.env.SECRET_KEY).toString();
        let user = await new User(newUser);
        user.id = uuid.v4();
        res.status(200).json(await user.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateParentStudents = async (req, res, next) => {

    try {
        const {id} = req.params;
        const {studentsList} = req.body;
        let user = await User.findOne({id});

        if (!user) {
            const error = new Error("Couldn't find some parent");
            error.statusCode = 401;
            throw error;
        }
        user.students = studentsList;
        await user.save();
        res.status(200).json({id: user.id});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {

    try {
        const {isPassword, isDataChange, userAfterChange} = req.body;
        let user = await User.findOne({id: userAfterChange.id});

        if (!user) {
            const error = new Error('User not found!!!');
            error.statusCode = 401;
            throw error;
        }
        let resultData = '';
        let resultPassword = null;

        if (isPassword) {
            let dbUserPassword = cryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(cryptoJS.enc.Utf8);
            let changeUserPassword = await cryptoJS.AES.encrypt(userAfterChange.newPassword, process.env.SECRET_KEY).toString();
            
            if (dbUserPassword === userAfterChange.password) {
                user.password = changeUserPassword;
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

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {

    try {
        let user = await User.findOne({id: req.params.id});

        if (!user) {
            const error = new Error('User not found!!!');
            error.statusCode = 401;
            throw error;
        }
        user.remove();
        res.status(200).json({name: `${user.lastName} ${user.firstName}`});
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getTeachers = async (req, res, next) => {

    try {
        let teachers = await User.find({status: 'teacher'});

        if (!teachers.length) {
            const error = new Error("Couldn't find any teachers");
            error.statusCode = 401;
            throw error;
        }
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
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {

    try {
        const {id, status} = req.params;
        let user = await User.findOne({id});

        if (!user) {
            const error = new Error(`Couldn't find some ${status}.`);
            error.statusCode = 401;
            throw error;
        }
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
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUsers = async (req, res, next) => {

    try {
        let {start, limit, status} = req.params;
        start = parseInt(start);
        limit = parseInt(limit);
        let users = await User.find({status});

        if (!users.length) {
            const error = new Error(`Couldn't find some ${status}`);
            error.statusCode = 401;
            throw error;
        }
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
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getUsersName = async (req, res, next) => {

    try {
        const {status} = req.params;
        let users = await User.find({status});

        if (!users.length) {
            const error = new Error(`Couldn't find any ${status}s`);
            error.statusCode = 401;
            throw error;
        }
        users = users.map(user => {
            return {
                id: user.id,
                name: `${user.lastName} ${user.firstName}`
            };
        });
        res.status(200).json(users);
    } catch (err) {
        
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
