import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import UserForm from '../../features/UserForm/UserFormContainer';

const Registration = () => (
    <div>
        <PageTitle>Registration</PageTitle>
        <UserForm isLogin={false}/>
    </div>
);

export default Registration;
