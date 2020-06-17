import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {Paper, TextField, Fab, Grid, Tooltip, Switch, Fade} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "../../common/Spinner/Spinner";
import TextMaskCustom from "../../common/TaskMaskCustom/TaskMaskCustom";
import componentStyle from "./EditUserDataStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const EditUserData = props => {
    const {user, updateUser, request} = props;
    const [data, setData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        telephone: user.telephone,
        email: user.email,
        password: '',
        newPassword: '',
        confirm: ''
    });
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [isError, setIsError] = useState({
        email: false,
        confirm: false,
        phone: false
    });
    const classes = useStyles();

    useEffect(() => {
        setIsAccept(!isError.email && !isError.confirm && !isError.phone &&
            (data.firstName !== user.firstName ||
                data.lastName !== user.lastName ||
                data.telephone !== user.telephone ||
                data.email !== user.email));
        setIsPasswordDisabled(data.newPassword.length > 0 && isChecked);

        if (!isChecked) {
            setData({
                ...data,
                newPassword: '',
                password: '',
                confirm: ''
            });
            setIsPasswordChange(false);
        } else {
            setIsPasswordChange(!isError.confirm && data.password.length > 0 && data.newPassword.length > 0);
        }

        if (request.updating) {
            setIsAccept(false);
            setIsChecked(false);
            setIsAccept(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.lastName, data.firstName, data.telephone, data.email, request.updating,
        data.newPassword, isChecked, isError.confirm, data.password, isError.phone, isError.email]);

    const handleTextField = event => {
        setData({...data, [event.target.name]: event.target.value})
    };

    const handleChecked = event => {
        setIsChecked(event.target.checked)
    };

    const handleUpdate = () => {
        let userAfterChange = data;
        userAfterChange.id = user.id;
        userAfterChange._id = user._id;
        updateUser(isPasswordChange, isAccept, userAfterChange);
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <Grid container style={{height: '100%'}} alignContent='center' justify='center'>
                {request.updating ? <Spinner/> :
                    <>
                        <Grid item lg={4} className={classes.column}>
                            <TextField label='first name' name='firstName' value={data.firstName}
                                       onChange={handleTextField} className={classes.textField}/>
                            <TextField label='last name' name='lastName' value={data.lastName}
                                       onChange={handleTextField} className={classes.textField}/>
                            <TextField label='phone number' name='telephone' value={data.telephone}
                                       onChange={handleTextField} className={classes.textField}
                                       InputProps={{inputComponent: TextMaskCustom}}
                                       error={isError.phone} helperText={isError.phone ? 'Incorrect entry' : ''}
                                       onBlur={event => setIsError(
                                           {...isError, phone: event.target.value.trim().length !== 18})
                                       }/>
                            <TextField label='email' name='email' value={data.email}
                                       onChange={handleTextField} className={classes.textField}
                                       error={isError.email} helperText={isError.email ? 'Incorrect entry' : ''}
                                       onBlur={event => setIsError({
                                           ...isError,
                                           email: !event.target.value.includes('@') || !event.target.value.includes('.')
                                       })}/>
                        </Grid>
                        <Grid item lg={4} className={classes.column}>
                            <Tooltip
                                title='Update data'
                                placement='top'
                                arrow
                                classes={{tooltip: classes.tooltip}}
                                TransitionComponent={Fade}
                                enterDelay={1000}
                            >
                        <span>
                            <Fab
                                color='primary'
                                className={classes.button}
                                aria-label='update'
                                disabled={isChecked ? !isPasswordChange : !isAccept}
                                onClick={handleUpdate}
                            >
                                <DoneIcon/>
                            </Fab>
                        </span>
                            </Tooltip>
                        </Grid>
                        <Grid item lg={4} className={classes.column}>
                            <div className={clsx(classes.textField, classes.justifyEnd)}>
                                {isChecked ? <LockOpenIcon/> : <LockIcon color='disabled'/>}
                                <Switch
                                    checked={isChecked}
                                    onChange={handleChecked}
                                    color='secondary'
                                    size='small'
                                />
                            </div>
                            <TextField label='new password' name='newPassword' value={data.newPassword}
                                       onChange={handleTextField}
                                       onBlur={event => setIsError(
                                           {...isError, confirm: event.target.value !== data.confirm}
                                       )}
                                       type='password' disabled={!isChecked} className={classes.textField}/>
                            <TextField label='confirm new password' name='confirm' value={data.confirm}
                                       onChange={handleTextField} className={classes.textField}
                                       error={isError.confirm}
                                       helperText={isError.confirm ? 'other than new password' : ''}
                                       type='password' disabled={!isPasswordDisabled}
                                       onBlur={event => setIsError({
                                           ...isError,
                                           confirm: event.target.value !== data.newPassword
                                       })}/>
                            <TextField label='old password' name='password' value={data.password}
                                       onChange={handleTextField} className={classes.textField}
                                       type='password' disabled={!isPasswordDisabled}/>
                        </Grid>
                    </>
                }
            </Grid>
        </Paper>
    )
};

EditUserData.propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default EditUserData;
