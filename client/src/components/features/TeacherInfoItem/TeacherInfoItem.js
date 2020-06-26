import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography, Grid, Link} from "@material-ui/core";
import componentStyle from "./TeacherInfoItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeacherInfoItem = props => {
    const {teacher} = props;
    const classes = useStyles();

    return (
        <Paper elevation={9} className={classes.root}>
            <Grid container alignItems='center' justify='center'>
                <Grid item lg={4}>
                    <Typography className={classes.info} align='left'>{teacher.name}</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center'>{teacher.subject}</Typography>
                </Grid>
                <Grid item lg={3}>
                    <Typography align='center'>{teacher.phone}</Typography>
                </Grid>
                <Grid item lg={3}>
                    <Link href={`mailto:${teacher.email}`}>{teacher.email}</Link>
                </Grid>
            </Grid>
        </Paper>
    )
};

TeacherInfoItem.propTypes = {
    teacher: PropTypes.object.isRequired
};

export default TeacherInfoItem
