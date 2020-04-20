const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const loadTestData = require('./dataTest');
const userRouter = require('./routes/user.routes');
const classRouter = require('./routes/class.routes');
const ratingRouter = require('./routes/rating.routes');
const studentRouter = require('./routes/student.routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', classRouter);
app.use('/api', ratingRouter);
app.use('/api', studentRouter);

mongoose.connect('mongodb://localhost:27017/school-diary', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to database');
    loadTestData();
});

app.listen(8000, () => console.log('Server is running on port: 8000'));
