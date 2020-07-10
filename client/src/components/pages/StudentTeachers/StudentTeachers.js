import React from "react";
import PageTitle from "../../common/PageTitle/PageTitle";
import StudentTeachersList from "../../features/StudentTeachersList/StudentTeachersListContainer";

const StudentTeachers = () => (
    <div>
        <PageTitle>Student's Teachers</PageTitle>
        <StudentTeachersList/>
    </div>
);

export default StudentTeachers;
