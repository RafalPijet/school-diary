import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import UserForm from '../../features/UserForm/UserFormContainer';

const Login = () => {

    return (
        <div>
            <PageTitle>Login</PageTitle>
            <UserForm isLogin={true}/>
        </div>
    )
};

export default Login;
