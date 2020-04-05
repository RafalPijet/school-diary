import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import SelectRegister from "../../common/SelectRegister/SelectRegister";
import {TextField} from "@material-ui/core";
import {Redirect} from "react-router";
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import Spinner from '../../common/Spinner/Spinner';
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
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
        marginTop: '50px',
        backgroundColor: theme.palette.action.dark
    }
}));

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
    const [userType, setUserType] = useState('parent');
    const [subject, setSubject] = useState('');
    const [isSubjectsDisabled, setIsSubjectsDisabled] = useState(true);
    const [isAccept, setIsAccept] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setIsSubjectsDisabled(userType === 'parent');
    }, [userType]);

    const handleTextField = event => {
        isLogin ? setLogin({...login, [event.target.name]: event.target.value}) :
            setRegister({...register, [event.target.name]: event.target.value});
    };

    const handleUserType = userType => {
        setUserType(userType);
        setIsSubjectsDisabled(userType === 'parent');
    };

    const handleSubjectType = subject => {
        setSubject(subject);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
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
                           onChange={handleTextField} className={classes.margin}/>
                <TextField label='last name' name='lastName' value={register.lastName}
                           onChange={handleTextField} className={classes.margin}/>
                <TextField type='number' label='phone number' name='telephone' value={register.telephone}
                           onChange={handleTextField} className={classes.margin}/>
            </div>
            <div className={classes.textRow}>
                <TextField error helperText='Incorrect entry' label='email' name='email'
                           value={isLogin ? login.email : register.email}
                           onChange={handleTextField} className={classes.margin}/>
                <TextField label='password' name='password' value={isLogin ? login.password : register.password}
                           type='password' onChange={handleTextField} className={classes.margin}/>
            </div>
            <div hidden={isLogin} className={classes.textRow}>
                <TextField label='confirm password' name='confirm' value={isLogin ? login.confirm : register.confirm}
                           type='password' onChange={handleTextField} className={classes.margin}/>
            </div>
            <Fab
                color='primary'
                className={classes.button}
                aria-label='add'
                onClick={() => console.log('wow')}
                disabled={!isAccept}
            >
                <DoneIcon/>
            </Fab>

        </Paper>
    )
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
