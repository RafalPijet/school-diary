import React from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography, Grid, Link} from "@material-ui/core";
import TeacherInfoItem from "../TeacherInfoItem/TeacherInfoItem";
import componentStyle from "./StudentTeachersItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const StudentTeachersItem = props => {
    const {classItem} = props;
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.root}>
            <Typography className={classes.description}>Class info:</Typography>
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
                    <span className={classes.description}>class teacher:</span>
                    <div className={classes.tutor}>
                        <Typography className={classes.info} display='inline'>{classItem.tutor.name}</Typography>
                        <Typography display='inline'>{classItem.tutor.phone}</Typography>
                        <Link className={classes.info} href={`mailto:${classItem.tutor.email}`}>{classItem.tutor.email}</Link>
                    </div>
                </Grid>
            </Grid>
            <Typography className={classes.description}>Teachers:</Typography>
            <Paper variant='outlined' className={classes.teachers}>
                {classItem.teachers.map((teacher, i) => {
                    return <TeacherInfoItem key={i} teacher={teacher}/>
                })}
            </Paper>
        </Paper>
    )
};

StudentTeachersItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default StudentTeachersItem;
