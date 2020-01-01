import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../common/TextField/TextField';
import {Redirect} from "react-router";
import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import './UserForm.scss';

class UserForm extends React.Component {
    state = {
        login: {
            email: '',
            password: ''
        },
        register: {
            firstName: '',
            lastName: '',
            birthDate: 'yyyy-mm-dd',
            email: '',
            password: '',
            confirm: ''
        },
        isVisible: true,
        userType: 'student',
        subject: 'english',
        subjectVisible: false
    };

    componentDidMount() {
        this.props.resetRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.request.error === null) {
            this.setState({isVisible: true});
        }
    }

    handleTextField = event => {
        const {isLogin} = this.props;
        const {login, register} = this.state;
        isLogin ? this.setState({login: {...login, [event.target.name]: event.target.value}}) :
            this.setState({register: {...register, [event.target.name]: event.target.value}});

    };

    handleSelectType = async event => {
        await this.setState({[event.target.name]: event.target.value});
        this.state.userType === 'teacher' ? this.setState({subjectVisible: true}) :
            this.setState({subjectVisible: false});
    };

    confirmData = event => {
        const {loadUser, addUser, isLogin, errorRequest, resetRequest} = this.props;
        const {login, register, userType, subject, subjectVisible} = this.state;
        event.preventDefault();

        if (isLogin) {

            if (login.email.includes('@')) {
                loadUser(login);
            } else {
                errorRequest('You must enter an email adress');
                setTimeout(() => resetRequest, 4000);
            }
        } else {
            if (register.firstName.length && register.lastName.length) {

                if (register.email.includes('@')) {

                    if (register.password === register.confirm && register.password.length !== 0) {

                        if (register.birthDate !== 'yyyy-mm-dd') {

                            if (new Date(register.birthDate) < new Date()) {
                                let user = {
                                    status: userType,
                                    subject: subjectVisible ? subject : '',
                                    firstName: register.firstName,
                                    lastName: register.lastName,
                                    birthDate: new Date(register.birthDate),
                                    email: register.email,
                                    password: register.password
                                };
                                addUser(user);
                            } else {
                                errorRequest("Date of birth must be earlier than today");
                                this.setState({register: {...register, birthDate: 'yyyy-mm-dd'}});
                                setTimeout(() => resetRequest(), 4000);
                            }
                        } else {
                            errorRequest("Check date");
                            setTimeout(() => resetRequest(), 4000);
                        }

                    } else {
                        errorRequest("Check password");
                        setTimeout(() => resetRequest(), 4000);
                    }
                } else {
                    errorRequest("You must enter an email adress");
                    setTimeout(() => resetRequest(), 4000);
                }
            }
        }
    };

    countVisible = error => {
        const {email} = this.state.login;
        const {resetRequest} = this.props;
        setTimeout(() => this.setState({
            isVisible: false,
            login: {
                email: `${(error === 'Wrong password!') ? email : ''}`,
                password: ''
            }
        }), 3000);
        setTimeout(() => resetRequest(), 4000);
    };

    render() {
        const {login, register, isVisible, userType, subject, subjectVisible} = this.state;
        const {handleTextField, confirmData, countVisible, handleSelectType} = this;
        const {isLogin} = this.props;
        const {pending, error, success} = this.props.request;

        if (pending) {
            return <Spinner/>
        } else if (!pending && success) {

            if (!isLogin) {
                return <Alert variant='success' isVisible={isVisible}>
                    {`The ${userType === 'student' ? 'parent' : userType} has been registered`}</Alert>
            } else {

                return <Redirect to='/'/>
            }
        } else if (!pending && error) {
            countVisible(error);
            return <Alert variant={error === 'User don\'t exist!!!' ? 'warning' : 'error'}
                          isVisible={isVisible}>{error}
            </Alert>
        } else {
            return (
                <form className='form-main'>
                    <div className='user-type' hidden={isLogin}>
                        <select value={userType} name='userType' onChange={handleSelectType}>
                            <optgroup label='User Type'>
                                <option value='student'>Student</option>
                                <option value='teacher'>Teacher</option>
                            </optgroup>
                        </select>
                        <select disabled={!subjectVisible} value={subject} name='subject' onChange={handleSelectType}>
                            <optgroup label="Teacher's Subject">
                                <option value='english'>English</option>
                                <option value='polish'>Polish</option>
                                <option value='math'>Math</option>
                                <option value='biology'>Biology</option>
                                <option value='history'>History</option>
                                <option value='geography'>Geography</option>
                                <option value='physics'>Physics</option>
                                <option value='chemistry'>Chemistry</option>
                            </optgroup>
                        </select>
                    </div>

                    <TextField hidden={isLogin} label='first name' name='firstName' value={register.firstName}
                               onChange={handleTextField}/>
                    <TextField hidden={isLogin} label='last name' name='lastName' value={register.lastName}
                               onChange={handleTextField}/>
                    <TextField hidden={isLogin} label='birth date' name='birthDate' value={register.birthDate}
                               onChange={handleTextField} type='date'/>
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
    addUser: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    errorRequest: PropTypes.func.isRequired,
    isLogin: PropTypes.bool,
    request: PropTypes.object.isRequired
};

export default UserForm;
