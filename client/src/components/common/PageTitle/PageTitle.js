import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light
    },
    info: {
        padding: style.baseSize,
        textAlign: 'center',
        fontWeight: 600
    }
}));

const PageTitle = ({children}) => {
    const classes = useStyles();

    return (
        <Paper elevation={9} className={classes.root}>
            <Typography className={classes.info} variant='h5' color='secondary'>{children}</Typography>
        </Paper>
    )
};

PageTitle.propTypes = {
    children: PropTypes.string,
};

export default PageTitle;
