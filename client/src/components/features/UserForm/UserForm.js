import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../common/TextField/TextField';
import {Redirect} from "react-router";
import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import './UserForm.scss';

class UserForm extends React.Component {
    state = {
        login: {
            email: '',
            password: ''
        },
        register: {
            status: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirm: ''
        }
    };

    handleTextField = event => {
        const {isLogin} = this.props;
        const {login, register} = this.state;
        isLogin ? this.setState({login: {...login, [event.target.name]: event.target.value}}) :
            this.setState({register: {...register, [event.target.name]: event.target.value}});

    };

    confirmData = event => {
        const {loadUser} = this.props;
        const {login} = this.state;
        event.preventDefault();
        loadUser(login);
    };

    render() {
        const {login, register} = this.state;
        const {handleTextField, confirmData} = this;
        const {isLogin} = this.props;
        const {pending, error, success} = this.props.request;

        if (pending) {
            return <Spinner/>
        } else if (!pending && success) {
            return <Redirect to='/'/>;
        } else {
            return (
                <form className='form-main'>
                    <TextField hidden={isLogin} label='first name' name='firstName' value={register.firstName}
                               onChange={handleTextField}/>
                    <TextField hidden={isLogin} label='last name' name='lastName' value={register.lastName}
                               onChange={handleTextField}/>
                    <TextField label='email' name='email' value={isLogin ? login.email : register.email}
                               onChange={handleTextField} type='email'/>
                    <TextField label='password' name='password' value={isLogin ? login.password : register.password}
                               onChange={handleTextField} type='password'/>
                    <TextField hidden={isLogin} label='confirm password' name='confirm' value={register.confirm}
                               onChange={handleTextField} type='password'/>
                    <Button variant="primary" onClick={confirmData}>Send</Button>
                </form>
            )
        }
    }
}

UserForm.propTypes = {
    loadUser: PropTypes.func.isRequired,
    isLogin: PropTypes.bool,
    request: PropTypes.object.isRequired
};

export default UserForm;
