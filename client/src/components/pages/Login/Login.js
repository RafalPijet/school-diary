import React from 'react';
import {connect} from 'react-redux';
import {resetRequest} from "../../../redux/actions/requestActions";
import PageTitle from '../../common/PageTitle/PageTitle';
import UserForm from '../../features/UserForm/UserFormContainer';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.resetRequest();
    }

    render() {
        return (
            <div>
                <PageTitle>Login</PageTitle>
                <UserForm isLogin={true}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    resetRequest: () => dispatch(resetRequest())
});


export default connect(null, mapDispatchToProps)(Login);
