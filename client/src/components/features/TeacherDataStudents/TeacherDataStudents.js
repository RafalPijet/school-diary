import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import componentStyle from "./TeacherDataStydentsStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeacherDataStudents = props => {
    const {request} = props;
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>

        </Paper>
    )
};

TeacherDataStudents.propTypes = {
    request: PropTypes.object.isRequired
};

export default TeacherDataStudents;
