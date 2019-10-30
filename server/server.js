const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/school-diary', {useNewUrlParser: true});
let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to database');
});

app.listen(8000, () => console.log('Server is running on port: 8000'));
