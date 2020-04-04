import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import SelectRegister from "../../common/SelectRegister/SelectRegister";
// import TextField from '../../common/TextField/TextField';
import {TextField} from "@material-ui/core";
import {Redirect} from "react-router";
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
// import Button from '../../common/Button/Button';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import {style} from "../../../styles/global";
// import './UserForm.scss';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: style.contentHeight
    },
    selectRow: {
        display: 'inherit',
        justifyContent: 'space-between',
        width: '400px',
        margin: '5px 0'
    },
    textRow: {
        display: 'inherit',
        flexDirection: 'inherit',
        justifyContent: 'center',
        width: '400px'
    },
    select: {
        minWidth: '150px'
    },
    margin: {
        margin: '5px 0'
    },
    button: {
        marginTop: '50px'
    }
});

const UserForm = props => {
    const {isLogin, subjects, resetRequest, loadUser, errorRequest, addUser} = props;
    const {pending, error, success} = props.request;
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        telephone: '',
        email: '',
        password: '',
        confirm: ''
    });
    const [isVisible, setIsVisible] = useState(true);
    const [userType, setUserType] = useState('parent');
    const [subject, setSubject] = useState(subjects.all[0]);
    const [isSubjectVisible, setIsSubjectVisible] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (pending || error !== null || success !== null) resetRequest();
        if (error === null) setIsVisible(true);
    }, [pending, error, success]);

    const handleTextField = event => {
        isLogin ? setLogin({...login, [event.target.name]: event.target.value}) :
            setRegister({...register, [event.target.name]: event.target.value});

    };

    const handleUserType = userType => {
        setUserType(userType);
        setIsSubjectVisible(userType === 'teacher');
    };

    const handleSubjectType = subject => {
        setSubject(subject);
    };

    const confirmData = event => {
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
                                    subject: isSubjectVisible ? subject : '',
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

    const countVisible = error => {
        const {email} = login;
        setTimeout(() => {
            setIsVisible(false);
            setLogin({
                ...login, email: `${(error === 'Wrong password!') ? email : ''}`,
                password: ''
            })
        }, 3000);
        setTimeout(() => resetRequest(), 4000);
    };

    if (pending) {
        return <Spinner/>
    } else if (!pending && success) {

        if (!isLogin) {
            return <Alert variant='success' isVisible={isVisible}>
                {`The ${userType === 'parent' ? 'parent' : userType} has been registered`}</Alert>
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
            <Paper variant='outlined' className={classes.root}>
                <div hidden={isLogin} className={classes.selectRow} hidden={isLogin}>
                    <SelectRegister
                        className={classes.select}
                        selectTitle='user type'
                        options={['parent', 'teacher']}
                        takeSelected={handleUserType}
                    />
                    <SelectRegister
                        className={classes.select}
                        selectTitle='subject'
                        isDisabled={!isSubjectVisible}
                        options={subjects.all}
                        takeSelected={handleSubjectType}
                    />
                </div>
                <div hidden={isLogin} className={classes.textRow}>
                    <TextField label='first name' name='firstName' value={register.firstName}
                               onChange={handleTextField} className={classes.margin}/>
                    <TextField label='last name' name='lastName' value={register.lastName}
                               onChange={handleTextField} className={classes.margin}/>
                    <TextField label='phone number' name='telephone' value={register.telephone}
                               onChange={handleTextField} className={classes.margin}/>
                </div>
                <div className={classes.textRow}>
                    <TextField label='email' name='email' value={isLogin ? login.email : register.email}
                               onChange={handleTextField} className={classes.margin}/>
                    <TextField label='password' name='password' value={isLogin ? login.password : register.password}
                               type='password' onChange={handleTextField} className={classes.margin}/>
                </div>
                <div hidden={isLogin} className={classes.textRow}>
                    <TextField label='confirm password' name='confirm' value={isLogin ? login.confirm : register.confirm}
                               type='password' onChange={handleTextField} className={classes.margin}/>
                </div>
                <Fab color='primary' className={classes.button} aria-label='add' onClick={() => console.log('wow')}>
                    <DoneIcon/>
                </Fab>


                {/*<TextField hidden={isLogin} label='first name' name='firstName' value={register.firstName}*/}
                {/*           onChange={handleTextField}/>*/}
                {/*<TextField hidden={isLogin} label='last name' name='lastName' value={register.lastName}*/}
                {/*           onChange={handleTextField}/>*/}
                {/*<TextField hidden={isLogin} label='birth date' name='birthDate' value={register.telephone}*/}
                {/*           onChange={handleTextField} type='date'/>*/}
                {/*<TextField label='email' name='email' value={isLogin ? login.email : register.email}*/}
                {/*           onChange={handleTextField} type='email'/>*/}
                {/*<TextField label='password' name='password' value={isLogin ? login.password : register.password}*/}
                {/*           onChange={handleTextField} type='password'/>*/}
                {/*<TextField hidden={isLogin} label='confirm password' name='confirm' value={register.confirm}*/}
                {/*           onChange={handleTextField} type='password'/>*/}
                {/*<Button variant="primary" onClick={confirmData}>Send</Button>*/}
            </Paper>
        )
    }

};

UserForm.propTypes = {
    loadUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    errorRequest: PropTypes.func.isRequired,
    isLogin: PropTypes.bool,
    request: PropTypes.object.isRequired,
    subjects: PropTypes.object.isRequired
};

export default UserForm;
