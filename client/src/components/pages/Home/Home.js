import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import ParentWelcome from "../../features/ParentWelcome/ParentWelcome";
import ratings from '../../../images/ratings.jpg';
import parent from '../../../images/parent.png';
import teachers from '../../../images/teachers.png';

const buttonsData = [
    {
        image: ratings,
        title: 'Ratings',
        bottom: 200,
        width: 400,
        height: 280,
        path: '/ratings'
    },
    {
        image: parent,
        title: 'Parent Data',
        left: 140,
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

const description = [
    "Hello dear parent. Thank you for choosing our product",
    'You can check the grades in all subjects',
    "You have access to contact the teachers in the class and the tutor",
    "You can edit your details and check student details"
];

const Home = () => (
    <div>
        <PageTitle>Parent Zone</PageTitle>
        <ParentWelcome buttons={buttonsData} description={description}/>
    </div>
);

export default Home;
