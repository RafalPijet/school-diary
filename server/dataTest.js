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
            const student1 = new Student({
                id: uuid.v4(),
                firstName: 'Jenifer',
                lastName: 'Travolta',
                birthDate: Date.now(),
                ratings: [],
                parents: []
            });
            const student2 = new Student({
                id: uuid.v4(),
                firstName: 'Tom',
                lastName: 'Travolta',
                birthDate: Date.now(),
                ratings: [],
                parents: []
            });
            const rating1 = new Rating({
                id: uuid.v4(),
                studentId: student1.id,
                subject: 'math',
                ratings: [4, 5]
            });
            const rating2 = new Rating({
                id: uuid.v4(),
                studentId: student1.id,
                subject: 'english',
                ratings: [3, 5, 6]
            });
            const rating3 = new Rating({
                id: uuid.v4(),
                studentId: student2.id,
                subject: 'math',
                ratings: [4, 2, 4]
            });
            const rating4 = new Rating({
                id: uuid.v4(),
                studentId: student2.id,
                subject: 'english',
                ratings: [2, 4, 5]
            });
            student1.ratings.push(rating1);
            student1.ratings.push(rating2);
            student2.ratings.push(rating3);
            student2.ratings.push(rating4);
            student1.parents.push(user);
            student2.parents.push(user);
            user.students.push(student1);
            user.students.push(student2);
            rating1.save();
            rating2.save();
            rating3.save();
            rating4.save();
            student1.save();
            student2.save();
            user.save();
            console.log('Test data has been successfuly loaded');
        }
    } catch (err) {
        console.log('Couldn\'t load test data: ' + err);
    }
};

module.exports = loadTestData;
