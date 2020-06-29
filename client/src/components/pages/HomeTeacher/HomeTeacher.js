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
        title: 'Teacher data',
        width: 350,
        height: 300,
        bottom: 175,
        left: 135,
        path: '/data'
    }
];

const description = [
    "Hello dear teacher. We hope that working with our product will help you at work.",
    "In the Class Diaries section you can choose the class in which you teach.",
    "By adding a new grade for a student, you can choose the grade scale and description.",
    "Remember that you can edit or delete any existing rating.",
    "In the Teacher Data section you have a preview of all your students... ",
    "...and contact details with their parents or guardians.",
    "You can also edit your personal data."
];

const HomeTeacher = () => (
    <div>
        <PageTitle>Teacher Zone</PageTitle>
        <UserWelcome
            description={description}
            userType='teacher'
            buttons={buttonsData}
            delay={1}
            duration={8}
        />
    </div>
);

export default HomeTeacher;
