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

exports.updateUser = async (req, res) => {

    try {
        let user = await User.findOne({id: req.body.id});
        user.status = req.body.status;
        user.subject = req.body.subject;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.birthDate = req.body.birthDate;
        user.students = req.body.students;
        res.status(200).json(await user.save());
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getTeachers = async (req, res) => {

    try {
        let users = await User.find();
        let teachers = users.filter(user => user.status === 'teacher');
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getParents = async (req, res) => {

    try {
        let users = await User.find();
        let parents = users.filter(user => user.status === 'student');
        res.status(200).json(parents)
    } catch (err) {
        res.status(500).json(err);
    }
};
