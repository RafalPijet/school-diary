import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import { Redirect, useLocation } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, TextField, Typography } from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import Fab from '@material-ui/core/Fab';
import Spinner from '../../common/Spinner/Spinner';
import componentStyle from '../UserForm/UserFormStyle';

const useStyles = makeStyles(theme => componentStyle(theme));

const NewPassword = props => {
    const { success, error, pending } = props.request;
    const [data, setData] = useState({
        password: '',
        confirm: ''
    })
    const [isError, setIsError] = useState(false);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState('');
    const classes = useStyles();
    let location = useLocation().pathname;

    useEffect(() => {
        location = location.substring(8, location.length);
        let index = location.indexOf('/');
        setEmail(location.substring(0, index));
        setToken(location.substring(index + 1, location.length));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleTextField = event => {
        setData({ ...data, [event.target.name]: event.target.value })
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
                        >
                            <DoneIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}

NewPassword.propTypes = {
    request: PropTypes.object.isRequired
}

export default NewPassword;