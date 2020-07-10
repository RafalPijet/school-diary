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

const HomePrincipal = () => (
    <div>
        <PageTitle>Principal's Zone</PageTitle>
        <UserWelcome
            userType='principal'
            buttons={buttonsData}
        />
    </div>
);

export default HomePrincipal;
