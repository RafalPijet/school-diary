import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography, Grid} from "@material-ui/core";
import componentStyle from "./StudentTeachersItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const StudentTeachersItem = props => {
    const {classItem} = props;
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <Typography variant='subtitle2'>Class info:</Typography>
            <Grid container justify='center' alignItems='center' style={{padding: '14px 0'}}>
                <Grid item lg={2}>
                    <Typography className={classes.info} align='center'>
                        {classItem.name}
                    </Typography>
                </Grid>
                <Grid item lg={2}>
                    <span className={classes.description}>students:</span>
                    <Typography className={classes.info} display='inline'>
                        {classItem.studentsAmount}
                    </Typography>
                </Grid>
                <Grid item lg={8}>
                    <span className={classes.description}>tutor:</span>
                </Grid>
            </Grid>

        </Paper>
    )
};

StudentTeachersItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default StudentTeachersItem;
