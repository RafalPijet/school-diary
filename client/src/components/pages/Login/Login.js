import React from 'react';
import {connect} from 'react-redux';
import {resetRequest} from "../../../redux/actions/requestActions";
import PageTitle from '../../common/PageTitle/PageTitle';
import UserForm from '../../features/UserForm/UserFormContainer';

const Login = props => {
    const {resetRequest} = props;
    resetRequest();

    return (
        <div>
            <PageTitle>Login</PageTitle>
            <UserForm isLogin={true}/>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    resetRequest: () => dispatch(resetRequest())
});


export default connect(null, mapDispatchToProps)(Login);
