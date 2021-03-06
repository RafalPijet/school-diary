import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import UserWelcome from "../../features/UserWelcome/UserWelcome";
import ratings from '../../../images/ratings.jpg';
import parent from '../../../images/parent.png';
import teachers from '../../../images/teachers.png';

const buttonsData = [
    {
        image: ratings,
        title: 'Grades',
        bottom: 200,
        width: 400,
        height: 280,
        path: '/grades'
    },
    {
        image: parent,
        title: "Parent's Data",
        left: 130,
        top: 20,
        width: 350,
        height: 230,
        path: '/data'
    },
    {
        image: teachers,
        title: 'Teachers',
        right: 180,
        bottom: 30,
        width: 320,
        height: 200,
        path: '/teachers'
    }
];

const Home = () => (
    <div>
        <PageTitle>Parent's Zone</PageTitle>
        <UserWelcome
            buttons={buttonsData}
            userType='parent'
        />
    </div>
);

export default Home;
