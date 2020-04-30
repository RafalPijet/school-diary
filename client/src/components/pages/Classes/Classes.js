import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import ClassesBox from '../../features/ClassesBox/ClassesBoxContainer';
import ClassesHandling from "../../features/ClassesHandling/ClassesHandlingContainer";

const Classes = () => (
    <div>
        <PageTitle>Classes</PageTitle>
        {/*<ClassesBox/>*/}
        <ClassesHandling/>
    </div>
);

export default Classes;
