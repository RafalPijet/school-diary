const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
    id: {type: "String", required: true},
    firstName: {type: "String", required: true},
    lastName: {type: "String", required: true},
    birthDate: {type: "Date", required: true},
    ratings: [{type: Schema.ObjectId, ref: "Rating"}],
    parents: [{type: Schema.ObjectId, ref: "User"}]
});

function populateRatings(next) {
    this.populate('ratings');
    next();
}

function populateUsers(next) {
    this.populate('parents');
    next();
}

Student.pre('find', populateRatings);
Student.pre('find', populateUsers);

module.exports = mongoose.model("Student", Student);

