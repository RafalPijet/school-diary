const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rating = new Schema({
    id: {type: "String", required: true},
    studentId: {type: "String", required: true},
    subject: {type: "String", required: true},
    ratings: [{type: "Number"}]
});

module.exports = mongoose.model("Rating", Rating);
