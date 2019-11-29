import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import ClassesBox from '../../features/ClassesBox/ClassesBoxContainer';
import ClassesPanel from '../../features/ClassesPanel/ClassesPanelContainer';

const Classes = () => (
    <div>
        <PageTitle>Classes</PageTitle>
        <ClassesPanel/>
        <ClassesBox/>
    </div>
);

export default Classes;
