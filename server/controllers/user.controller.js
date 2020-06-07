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

exports.getParents = async (req, res) => {

    try {
        let parents = await User.find({status: 'parent'});
        parents = await parents.map(parent => {
            return {
                id: parent.id,
                _id: parent._id,
                firstName: parent.firstName,
                lastName: parent.lastName,
                email: parent.email,
                telephone: parent.telephone,
                students: parent.students
            }
        });
        res.status(200).json(parents)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getParentsName = async (req, res) => {

    try {
        let parents = await User.find({status: 'parent'});
        parents = parents.map(parent => {
            return {
                id: parent.id,
                name: `${parent.lastName} ${parent.firstName}`
            }
        });
        res.status(200).json(parents);
    } catch (err) {
        res.status(500).json(err);
    }
};
