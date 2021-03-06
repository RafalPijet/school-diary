import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Button } from "@material-ui/core";
import SelectRegister from "../../common/SelectRegister/SelectRegister";
import { TextField } from "@material-ui/core";
import { Redirect } from "react-router";
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import TextMaskCustom from "../../common/TaskMaskCustom/TaskMaskCustom";
import Spinner from '../../common/Spinner/Spinner';
import Alert from "../../common/Alert/Alert";
import componentStyle from "./UserFormStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const UserForm = props => {
    const { isLogin, subjects, resetRequest, loadUser, addUser, registerAfter,
         setRegisterAfter, resetPassword, alertSuccess, resetAlertSuccess } = props;
    const { pending, error, success } = props.request;
    const [login, setLogin] = useState({
        email: '',
        password: ''
    });
    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        telephone: '(0048)',
        email: '',
        password: '',
        confirm: ''
    });
    const [userType, setUserType] = useState('parent');
    const [subject, setSubject] = useState('');
    const [isSubjectsDisabled, setIsSubjectsDisabled] = useState(true);
    const [isAccept, setIsAccept] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [isError, setIsError] = useState({
        email: false,
        confirm: false,
        phone: false
    });
    const classes = useStyles();

    useEffect(() => {
        setIsSubjectsDisabled(userType === 'parent');
        if (success) resetRequest();

        if (isLogin) {
            let { email, password } = login;
            setIsAccept(email.length > 0 && password.length > 0);

            if (Object.values(registerAfter.email).length && Object.values(registerAfter.password).length) {
                setLogin({
                    email: registerAfter.email,
                    password: registerAfter.password
                });
                setRegisterAfter({ email: {}, password: {} });
                setIsAlert(true);
            }
            setIsAccept(false);

            if (!isAlert) setIsAccept(login.email.length > 0 && login.password.length > 0);
        } else {
            let { firstName, lastName, telephone, email, password, confirm } = register;
            setIsAccept(firstName.length > 0 && lastName.length > 0 && telephone.length === 18 && email.length > 0
                && (password === confirm && password.length > 0 && confirm.length > 0) &&
                (userType === 'teacher' ? subject.length > 0 : userType.length > 0)
                && !isError.confirm && !isError.email)
        }

        if (error !== null) {
            setIsAlert(true);
        }

    }, [userType, login.email, login.password, register.firstName, register.lastName, register,
        register.telephone, register.email, register.password, register.confirm, subject, login, isLogin,
        isError.email, isError.confirm, registerAfter.email, registerAfter.password, error, isAlert,
        setRegisterAfter, success, resetRequest]);

    const handleTextField = event => {
        isLogin ? setLogin({ ...login, [event.target.name]: event.target.value }) :
            setRegister({ ...register, [event.target.name]: event.target.value });
    };

    const handleUserType = userType => {
        setUserType(userType);
        setIsSubjectsDisabled(userType === 'parent');
    };

    const handleSubjectType = subject => {
        setSubject(subject);
    };

    const handleCloseHandling = () => {
        setIsAlert(false);
        setIsAccept(true);

        if (error !== null) resetRequest();

        if (alertSuccess.isOpen) {
            let email = alertSuccess.message.substring(26, alertSuccess.message.length);
            email = email.substring(0, email.indexOf(' '));
            setLogin({email: email, password: ''});
            resetAlertSuccess(false, '');
        } 
    };

    const sendData = () => {

        if (isLogin) {
            const { email, password } = login;
            loadUser({ email, password })
        } else {
            const { firstName, lastName, telephone, email, password } = register;
            let data = {
                status: userType,
                subject,
                firstName,
                lastName,
                telephone,
                email,
                password
            };
            setRegisterAfter({ email, password });
            addUser(data);
        }
    };

    const resetHandling = () => {
        resetPassword(login.email);
    }

    const alertMessage = () => {

        if (error) {
            return error
        }

        if (alertSuccess.isOpen) {
            return alertSuccess.message
        }
    }

    if (pending) {
        return <Paper elevation={9} className={clsx(classes.column, classes.root)}>
            <Spinner />
        </Paper>
    }
    if (success) {
        return !isLogin ? <Redirect to='/login' /> : <Redirect to='/' />
    } else {
        return (
            <Paper elevation={9}>
                <Grid container className={classes.root}>
                    <Grid item lg={6} className={classes.column}>
                        <div hidden={isLogin} className={classes.selectRow}>
                            <SelectRegister
                                className={classes.select}
                                selectTitle='user type'
                                options={['parent', 'teacher']}
                                takeSelected={handleUserType}
                            />
                            <SelectRegister
                                className={classes.select}
                                selectTitle='subject'
                                isDisabled={isSubjectsDisabled}
                                options={subjects.all}
                                takeSelected={handleSubjectType}
                            />
                        </div>
                        <div hidden={isLogin} className={classes.textRow}>
                            <TextField label='first name' name='firstName' value={register.firstName}
                                onChange={handleTextField} className={classes.margin} />
                            <TextField label='last name' name='lastName' value={register.lastName}
                                onChange={handleTextField} className={classes.margin} />
                            <TextField label='phone number' name='telephone' value={register.telephone}
                                error={isError.phone} helperText={isError.phone ? 'Incorrect entry' : ''}
                                InputProps={{ inputComponent: TextMaskCustom }}
                                onBlur={event => {
                                    setRegister({ ...register, telephone: event.target.value.trim() });
                                    setIsError({ ...isError, phone: event.target.value.trim().length !== 18 });
                                }}
                                onChange={handleTextField} className={classes.margin} />
                        </div>
                        <div className={classes.textRow}>
                            <TextField error={isError.email} helperText={isError.email ? 'Incorrect entry' : ''}
                                label='email' name='email' value={isLogin ? login.email : register.email}
                                onBlur={event => setIsError({
                                    ...isError,
                                    email: !event.target.value.includes('@') || !event.target.value.includes('.')
                                })}
                                onChange={handleTextField} className={classes.margin} />
                            <TextField label='password' name='password' value={isLogin ? login.password : register.password}
                                type='password' onChange={handleTextField} className={classes.margin} />
                            <Button
                                onClick={resetHandling}
                                disabled={isError.email || !login.email}
                                hidden={!isLogin} color="secondary">Reset password
                            </Button>
                        </div>
                        <div hidden={isLogin} className={classes.textRow}>
                            <TextField error={isError.confirm} helperText={isError.confirm ? 'other than password' : ''}
                                label='confirm password' name='confirm' value={register.confirm}
                                onBlur={event => setIsError({
                                    ...isError,
                                    confirm: event.target.value !== register.password
                                })}
                                type='password' onChange={handleTextField} className={classes.margin} />
                        </div>
                    </Grid>
                    <Grid item lg={6} className={classes.column}>
                        <Fab
                            color='primary'
                            className={classes.button}
                            aria-label='add'
                            onClick={sendData}
                            disabled={!isAccept}
                        >
                            <DoneIcon />
                        </Fab>
                    </Grid>
                </Grid>
                <Alert
                    message={error !== null || alertSuccess.isOpen ? alertMessage() : 'The user has been registered'}
                    variant={error !== null ? 'error' : 'success'}
                    isOpenAlert={isAlert || alertSuccess.isOpen}
                    handleCloseHandling={handleCloseHandling}
                    duration={error !== null || alertSuccess.isOpen ? 5000 : 2000}
                />
            </Paper>
        )
    }
};

UserForm.propTypes = {
    loadUser: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    setRegisterAfter: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    isLogin: PropTypes.bool,
    request: PropTypes.object.isRequired,
    subjects: PropTypes.object.isRequired,
    registerAfter: PropTypes.object.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    resetAlertSuccess: PropTypes.func.isRequired
};

export default UserForm;
