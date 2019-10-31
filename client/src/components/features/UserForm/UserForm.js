import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../common/TextField/TextField';
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
            password: '',
            confirm: ''
        }
    };

    handleTextField = event => {
        const {login} = this.state;
        this.setState({login: {...login, [event.target.name]: event.target.value}});
        console.log(this.state.login.email);
        console.log(this.state.login.password);
    };

    render() {
        const {login, register} = this.state;
        const {handleTextField} = this;
        return (
            <form className='form-main'>
                <TextField label='first name' name='firstName' value={register.firstName}/>
                <TextField label='last name' name='lastName' value={register.lastName}/>
                <TextField label='email' name='email' value={login.email}
                           onChange={handleTextField} type='email'/>
                <TextField label='password' name='password' value={login.password}
                           onChange={handleTextField} type='password'/>
                <TextField label='confirm password' name='confirm' value={register.confirm}/>
            </form>
        )
    }
}

export default UserForm;
