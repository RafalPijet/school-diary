const uuid = require('uuid');
const User = require('./models/user.model');
const Student = require('./models/student.model');
const Rating = require('./models/rating.model');

const loadTestData = async () => {

    try {
        const usersAmount = await User.countDocuments();
        console.log('No users. Loading data...');

        if (usersAmount === 0) {
            const user = new User({
                id: uuid.v4(),
                status: 'student',
                subject: '',
                firstName: 'John',
                lastName: 'Travolta',
                birthDate: Date.now(),
                email: 'travolta@gmail.com',
                password: 'qqq'
            });
            const student = new Student({
                id: uuid.v4(),
                firstName: 'Jenifer',
                lastName: 'Connelly',
                birthDate: Date.now(),
                ratings: [],
                parents: []
            });
            const rating1 = new Rating({
                id: uuid.v4(),
                studentId: student.id,
                subject: 'math',
                ratings: [4, 5]
            });
            const rating2 = new Rating({
                id: uuid.v4(),
                studentId: student.id,
                subject: 'english',
                ratings: [3, 5, 6]
            });
            student.ratings.push(rating1);
            student.ratings.push(rating2);
            student.parents.push(user);
            user.students.push(student);
            rating1.save();
            rating2.save();
            student.save();
            user.save();
            console.log('Test data has been successfuly loaded');
        }
    } catch (err) {
        console.log('Couldn\'t load test data: ' + err);
    }
};

module.exports = loadTestData;
