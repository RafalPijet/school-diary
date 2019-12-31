const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id: {type: "String", required: true},
    status: {type: "String", required: true},
    subject: {type: "String", required: false},
    firstName: {type: "String", required: true},
    lastName: {type: "String", required: true},
    birthDate: {type: "Date", required: true},
    email: {type: "String", required: true, unique: true},
    password: {type: "String", required: true},
    students: [{type: Schema.ObjectId, ref: "Student"}]
});

function populateStudents(next) {
    this.populate('students');
    next();
}

// User.pre('find', populateStudents);
User.pre('findOne', populateStudents);

module.exports = mongoose.model("User", User);
