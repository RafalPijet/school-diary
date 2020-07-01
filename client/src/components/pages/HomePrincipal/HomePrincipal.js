import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import UserWelcome from "../../features/UserWelcome/UserWelcome";
import students from '../../../images/students.png';
import teachers from '../../../images/principalTeachers.png';
import classes from '../../../images/classes.png';
import parents from '../../../images/parents.png';

const buttonsData = [
    {
        image: classes,
        title: 'Classes',
        width: 400,
        height: 260,
        top: 195,
        left: 260,
        path: '/classes'
    },
    {
        image: teachers,
        title: 'Teachers',
        width: 300,
        top: 16,
        left: 97,
        height: 200,
        path: '/teachers'
    },
    {
        image: students,
        title: 'Students',
        width: 300,
        height: 200,
        right: 146,
        top: 136,
        path: '/students'
    },
    {
        image: parents,
        title: 'Parents',
        width: 350,
        height: 220,
        top: 160,
        path: '/parents'
    }
];

const description = [
    'Hello dear principal. Thank you for choosing our product',
    'In the Classes section you can add new school classes.',
    'You can also configure the composition of students in the class.',
    'You can assign teachers of a given subject to a selected class',
    'You determine which teacher is the class tutor',
    'In the Teachers section you have a preview of all teachers with contact details...',
    '...and information in which they teach classes and how many students they have',
    'You can remove an individual teacher from the school\'s teachers list',
    'In the Students section you have a preview of all students with information about their class...',
    '...and contact details for their parents or guardians.',
    'You can also add new students or edit existing data...',
    '...including removing a selected student from the school\'s student list.',
    'In the Parents section you can view information about all parents or guardians.',
    'You can assign each student to the appropriate student or students',
    'You can delete an individual parent from the list'
];

const HomePrincipal = () => (
    <div>
        <PageTitle>Principal Zone</PageTitle>
        <UserWelcome
            description={description}
            userType='principal'
            delay={1}
            duration={5}
            buttons={buttonsData}
        />
    </div>
);

export default HomePrincipal;
