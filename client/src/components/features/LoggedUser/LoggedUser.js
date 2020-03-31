import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Paper, Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import PersonIcon from '@material-ui/icons/PersonOutline';
import LightDarkIcon from '@material-ui/icons/InvertColors';
import {style} from '../../../styles/global';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1),
        padding: `${style.smallSize}`
    },
    iconOnLine: {
        color: `${style.colorOnLine}`
    },
    iconOffLine: {
        color: `${style.colorOffLine}`
    },
    switch: {
        display: 'inherit',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    login: {
        display: 'inherit',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}));

const LoggedUser = props => {
    const {isLogin, setIsDark} = props;
    const {firstName, lastName, status} = props.user;
    const [isChecked, setIsChecked] = useState(false);
    const classes = useStyles();

    const switchHandling = async () => {
        await setIsChecked(!isChecked);
        setIsDark(isChecked);
    };
    return (
        <Paper elevation={9} className={classes.root}>
            <Grid item lg={10} className={classes.login}>
                <PersonIcon className={isLogin ? classes.iconOnLine : classes.iconOffLine}/>
                <Typography display='inline' variant='subtitle1' color='primary' hidden={!isLogin}>
                    {` ${isLogin ? firstName : ''} ${isLogin ? lastName : ''} - ${isLogin ? status : ''}`}
                </Typography>
            </Grid>
            <Grid item lg={2} className={classes.switch}>
                <LightDarkIcon/>
                <Switch
                    checked={isChecked}
                    onChange={switchHandling}
                    name='changeTheme'
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </Grid>
        </Paper>
    )
};

LoggedUser.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    status: PropTypes.string,
    setIsDark: PropTypes.func.isRequired
};

export default LoggedUser;
