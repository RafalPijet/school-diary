const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
    id: {type: "String", required: true},
    name: {type: "String", required: true},
    mainTeacher: {type: Schema.ObjectId, ref: "User"},
    students: [{type: Schema.ObjectId, ref: "Student"}],
    subjectTeachers: [{type: Schema.ObjectId, ref: "User"}]
});

function populateMainTeacher(next) {
    this.populate('mainTeacher');
    next();
}

function populateSubjectTeachers(next) {
    this.populate('subjectTeachers');
    next();
}

function populateStudents(next) {
    this.populate('students');
    next();
}

Class.pre('find', populateMainTeacher);
Class.pre('find', populateSubjectTeachers);
Class.pre('find', populateStudents);

module.exports = mongoose.model("Class", Class);
