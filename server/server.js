const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const sanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const loadTestData = require('./dataTest');
const userRouter = require('./routes/user.routes');
const classRouter = require('./routes/class.routes');
const ratingRouter = require('./routes/rating.routes');
const studentRouter = require('./routes/student.routes');
const config = require('./config');

const app = express();

app.use(cors());
app.use(sanitize());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', classRouter);
app.use('/api', ratingRouter);
app.use('/api', studentRouter);
app.use(helmet());
app.use(express.static(path.join(__dirname, '/../client/build')));

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to database');
    loadTestData();
});

db.on('error', err => console.log("Error connection: " + err));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
});

app.listen(config.PORT, () => console.log(`Server is running on port: ${config.PORT}`));
