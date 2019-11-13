const uuid = require('uuid');
const User = require('./models/user.model');
const Student = require('./models/student.model');
const Rating = require('./models/rating.model');
const Class = require('./models/class.model');

const loadTestData = async () => {

    try {
        const usersAmount = await User.countDocuments();

        if (usersAmount === 0) {
            console.log('No users. Loading data...');
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
            const user4 = new User({
                id: uuid.v4(),
                status: 'student',
                subject: '',
                firstName: 'Jack',
                lastName: 'Nicolson',
                birthDate: Date.now(),
                email: 'nicolson@gmail.com',
                password: 'qqq'
            });
            const user5 = new User({
                id: uuid.v4(),
                status: 'student',
                subject: '',
                firstName: 'Robert',
                lastName: 'De Niro',
                birthDate: Date.now(),
                email: 'deniro@gmail.com',
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
            const student3 = new Student({
                id: uuid.v4(),
                firstName: 'Nicol',
                lastName: 'Nicolson',
                birthDate: Date.now(),
                ratings: [],
                parents: []
            });
            const student4 = new Student({
                id: uuid.v4(),
                firstName: 'Alex',
                lastName: 'De Niro',
                birthDate: Date.now(),
                ratings: [],
                parents: []
            });
            const item1 = {
                value: "6", description: 'For team work', date: Date.now(), teacher: "David Gahan"
            };
            const item2 = {
                value: "4", description: 'For home work', date: Date.now(), teacher: "David Gahan"
            };
            const item3 = {
                value: "3+", description: 'For school test', date: Date.now(), teacher: "Martin L.Gore"
            };
            const rating1 = new Rating({
                id: uuid.v4(),
                studentId: student1.id,
                subject: 'math',
                ratings: [item1, item2, item1]
            });
            const rating2 = new Rating({
                id: uuid.v4(),
                studentId: student1.id,
                subject: 'english',
                ratings: [item3, item3, item3]
            });
            const rating3 = new Rating({
                id: uuid.v4(),
                studentId: student2.id,
                subject: 'math',
                ratings: [item1, item1, item1, item2, item2]
            });
            const rating4 = new Rating({
                id: uuid.v4(),
                studentId: student2.id,
                subject: 'english',
                ratings: [item3, item3]
            });
            const rating5 = new Rating({
                id: uuid.v4(),
                studentId: student3.id,
                subject: 'math',
                ratings: [item1, item2, item1, item2]
            });
            const rating6 = new Rating({
                id: uuid.v4(),
                studentId: student3.id,
                subject: 'english',
                ratings: [item3, item3, item3]
            });
            const rating7 = new Rating({
                id: uuid.v4(),
                studentId: student4.id,
                subject: 'math',
                ratings: [item2, item1, item1, item2]
            });
            const rating8 = new Rating({
                id: uuid.v4(),
                studentId: student4.id,
                subject: 'english',
                ratings: [item3, item3]
            });

            const user2 = new User({
                id: uuid.v4(),
                status: 'teacher',
                subject: 'math',
                firstName: 'David',
                lastName: 'Gahan',
                birthDate: Date.now(),
                email: 'david@gmail.com',
                password: 'qqq',
                students: []
            });
            const user3 = new User({
                id: uuid.v4(),
                status: 'teacher',
                subject: 'english',
                firstName: 'Martin',
                lastName: 'L.Gore',
                birthDate: Date.now(),
                email: 'martin@gmail.com',
                password: 'qqq',
                students: []
            });
            const class1 = new Class({
                id: uuid.v4(),
                name: 'Class 8a',
                mainTeacher: {},
                subjectTeachers: [],
                students: []
            });
            const class2 = new Class({
                id: uuid.v4(),
                name: 'Class 7b',
                mainTeacher: {},
                subjectTeachers: [],
                students: []
            });
            class1.mainTeacher = user2;
            class1.subjectTeachers.push(user2);
            class1.subjectTeachers.push(user3);
            class2.mainTeacher = user3;
            class2.subjectTeachers.push(user2);
            student1.ratings.push(rating1);
            student1.ratings.push(rating2);
            student2.ratings.push(rating3);
            student2.ratings.push(rating4);
            student1.parents.push(user);
            student2.parents.push(user);
            student3.ratings.push(rating5);
            student3.ratings.push(rating6);
            student4.ratings.push(rating7);
            student4.ratings.push(rating8);
            user.students.push(student1);
            user.students.push(student2);
            user4.students.push(student3);
            user5.students.push(student4);
            class1.students.push(student1);
            class1.students.push(student2);
            class2.students.push(student3);
            class2.students.push(student4);
            class1.save();
            class2.save();
            rating1.save();
            rating2.save();
            rating3.save();
            rating4.save();
            rating5.save();
            rating6.save();
            rating7.save();
            rating8.save();
            student1.save();
            student2.save();
            student3.save();
            student4.save();
            user.save();
            user2.save();
            user3.save();
            user4.save();
            user5.save();
            console.log('Test data has been successfuly loaded');
        }
    } catch (err) {
        console.log('Couldn\'t load test data: ' + err);
    }
};

module.exports = loadTestData;
