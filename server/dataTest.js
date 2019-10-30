const uuid = require('uuid');
const User = require('./models/user.model');

const loadTestData = async () => {

    try {
        const usersAmount = await User.countDocuments();

        if (usersAmount === 0) {
            const user = new User({
                id: uuid.v4(),
                status: 'student',
                firstName: 'John',
                lastName: 'Travolta',
                email: 'travolta@gmail.com',
                password: 'qqq'
            });
            user.save();
            console.log('Test data has been successfuly loaded');
        }
    } catch (err) {
        console.log('Couldn\'t load test data: ' + err);
    }
};

module.exports = loadTestData;
