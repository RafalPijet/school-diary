const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id: {type: "String", required: true},
    status: {type: "String", required: true},
    subject: {type: "String", required: false},
    firstName: {type: "String", required: true},
    lastName: {type: "String", required: true},
    telephone: {type: "String", required: true},
    email: {type: "String", required: true, unique: true},
    password: {type: "String", required: true},
    students: [{type: Schema.ObjectId, ref: "Student"}],
    resetToken: String,
    resetTokenExpiration: Date
});

function populateStudents(next) {
    this.populate('students');
    next();
}

User.pre('findOne', populateStudents);

module.exports = mongoose.model("User", User);
