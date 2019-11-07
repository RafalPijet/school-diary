const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Class = new Schema({
    id: {type: "String", required: true},
    name: {type: "String", required: true},
    mainTeacher: {type: Schema.ObjectId, ref: "User"},
    subjectTeachers: [{type: Schema.ObjectId, ref: "User"}],
    students: [{type: Schema.ObjectId, ref: "User"}]
});

module.exports = mongoose.model("Class", Class);
