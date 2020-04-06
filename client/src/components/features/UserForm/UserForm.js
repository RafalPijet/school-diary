import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import MaskedInput from "react-text-mask/dist/reactTextMask";
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

const TextMaskCustom = props => {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[0]/, /[0]/, /[0-9]/, /[0-9]/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
};

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

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
        telephone: '(0048)',
        email: '',
        password: '',
        confirm: ''
    });
    const [userType, setUserType] = useState('parent');
    const [subject, setSubject] = useState('');
    const [isSubjectsDisabled, setIsSubjectsDisabled] = useState(true);
    const [isAccept, setIsAccept] = useState(false);
    const [isError, setIsError] = useState({
        email: false,
        confirm: false
    });
    const classes = useStyles();

    useEffect(() => {
        setIsSubjectsDisabled(userType === 'parent');

        if (isLogin) {
            let {email, password} = login;
            setIsAccept(email.length > 0 && password.length > 0)
        } else {
            let {firstName, lastName, telephone, email, password, confirm} = register;
            setIsAccept(firstName.length > 0 && lastName.length > 0 && telephone.length === 18 && email.length > 0
                && (password === confirm && password.length > 0 && confirm.length > 0) &&
                (userType === 'teacher' ? subject.length > 0 : userType.length > 0)
                && !isError.confirm && !isError.email)
        }
    }, [userType, login.email, login.password, register.firstName, register.lastName, register,
        register.telephone, register.email, register.password, register.confirm, subject, isLogin, login,
        isError.email, isError.confirm]);

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
                <TextField label='phone number' name='telephone' value={register.telephone}
                           InputProps={{inputComponent: TextMaskCustom}}
                           onChange={handleTextField} className={classes.margin}/>
            </div>
            <div className={classes.textRow}>
                <TextField error={isError.email} helperText={isError.email ? 'Incorrect entry' : ''}
                           label='email' name='email' value={isLogin ? login.email : register.email}
                           onBlur={event => setIsError({...isError, email: !event.target.value.includes('@')})}
                           onChange={handleTextField} className={classes.margin}/>
                <TextField label='password' name='password' value={isLogin ? login.password : register.password}
                           type='password' onChange={handleTextField} className={classes.margin}/>
            </div>
            <div hidden={isLogin} className={classes.textRow}>
                <TextField error={isError.confirm} helperText={isError.confirm ? 'other than password' : ''}
                           label='confirm password' name='confirm' value={register.confirm}
                           onBlur={event => setIsError({
                               ...isError,
                               confirm: event.target.value !== register.password
                           })}
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
