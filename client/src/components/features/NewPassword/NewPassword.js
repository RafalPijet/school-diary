import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import { Redirect, useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, TextField, Typography } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import componentStyle from '../UserForm/UserFormStyle';

const useStyles = makeStyles(theme => componentStyle(theme));

const NewPassword = props => {
    const { success, error, pending } = props.request;
    const { changePassword, resetRequest } = props;
    const [data, setData] = useState({
        password: '',
        confirm: ''
    })
    const [isError, setIsError] = useState(false);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState('');
    const [isAccept, setIsAccept] = useState(false);
    const classes = useStyles();
    let location = useLocation().pathname;

    useEffect(() => {
        let path = location.substring(8, location.length);
        let index = path.indexOf('/');
        setEmail(path.substring(0, index));
        setToken(path.substring(index + 1, path.length));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setIsAccept(data.password.length && data.confirm.length && data.password === data.confirm);

        if (isAccept) {
            setIsError(data.password.length > 0 && data.confirm.length > 0 && data.password !== data.confirm);
        }
    }, [data.password, data.confirm, isAccept]);

    const handleTextField = event => {
        setData({ ...data, [event.target.name]: event.target.value })
    };

    const changePasswordHandling = () => {
        changePassword(token, data);
    };

    if (pending) {
        return (
            <Paper elevation={9} className={clsx(classes.column, classes.root)}>
                <Spinner />
            </Paper>
        )
    }

    if (success) {
        return <Redirect to='/login' />
    } else {
        return (
            <Paper elevation={9}>
                <Grid container className={classes.root}>
                    <Grid item lg={6} className={classes.column}>
                        <div className={classes.textRow}>
                            <Typography variant="h5" color='secondary'>{email}</Typography>
                            <TextField label='password' name='password' value={data.password}
                                type='password' onChange={handleTextField} className={classes.margin} />
                            <TextField error={isError} helperText={isError ? 'other than password' : ''}
                                label='confirm password' name='confirm' value={data.confirm}
                                onBlur={event => setIsError(event.target.value !== data.password)}
                                type='password' onChange={handleTextField} className={classes.margin} />
                        </div>
                    </Grid>
                    <Grid item lg={6} className={classes.column}>
                        <Fab
                            color='primary'
                            className={classes.button}
                            aria-label='add'
                            disabled={!isAccept}
                            onClick={changePasswordHandling}
                        >
                            <DoneIcon />
                        </Fab>
                    </Grid>
                </Grid>
                <Alert
                    message={error}
                    variant='error'
                    isOpenAlert={error !== null}
                    duration={5000}
                    handleCloseHandling={() => resetRequest()}
                />
            </Paper>
        )
    }

}

NewPassword.propTypes = {
    request: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired
}

export default NewPassword;