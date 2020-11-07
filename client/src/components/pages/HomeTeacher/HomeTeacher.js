import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import UserWelcome from "../../features/UserWelcome/UserWelcome";
import classDiaries from '../../../images/classDiares.jpg';
import teacherData from '../../../images/teacherData.jpg'

const buttonsData = [
    {
        image: classDiaries,
        title: 'Class Diaries',
        top: 150,
        width: 400,
        height: 360,
        left: 30,
        path: '/diaries'
    },
    {
        image: teacherData,
        title: "Teacher's Data",
        width: 350,
        height: 300,
        bottom: 175,
        left: 113,
        path: '/data'
    }
];

const HomeTeacher = () => {
    return (
        <div>
            <PageTitle>Teacher's Zone</PageTitle>
            <UserWelcome
                userType='teacher'
                buttons={buttonsData}
            />
        </div>
    )
};

export default HomeTeacher;
