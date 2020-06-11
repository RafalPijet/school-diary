import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {
    Paper,
    Grid,
    Typography,
    Link,
    Tooltip,
    IconButton,
    Fade
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/core/styles";
import componentStyle from "./TeacherItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeacherItem = props => {
    const {teacher} = props;
    const classes = useStyles();
    let counter = 0;

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container>
                <Grid item lg={4} className={classes.names}>
                    <Typography style={{fontWeight: 700}} display='inline'>
                        {`${teacher.lastName} ${teacher.firstName} `}
                    </Typography>
                    <Typography display='inline' className={classes.subject}>{teacher.subject}</Typography>
                </Grid>
                <Grid item lg={2} className={classes.names}>
                    <Typography className={classes.sum} align='center'>{teacher.telephone}</Typography>
                </Grid>
                <Grid item lg={2} className={classes.names}>
                    <Link href={`mailto:${teacher.email}`} align='center'>{teacher.email}</Link>
                </Grid>
                <Grid item lg={1} className={classes.names}>
                    <Typography className={classes.tutor} align='center'>{teacher.tutorClass}</Typography>
                </Grid>
                <Grid item lg={2} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <div className={classes.classes}>
                        {teacher.teacherClasses.length ?
                            teacher.teacherClasses.map((item, i) => {
                                counter = counter + item.studentsAmount;
                                return (
                                    <Typography align='right' key={i} display='block' className={classes.tutor}>
                                        {`${item.className} - ${item.studentsAmount}`}
                                    </Typography>

                                )

                            }) :
                            <Typography align='center' className={classes.tutor}>none</Typography>
                        }
                        <Typography hidden={!teacher.teacherClasses.length} align='right' className={classes.sum}>
                            {`ALL: ${counter}`}
                        </Typography>
                    </div>
                </Grid>
                <Grid item lg={1} className={classes.operation}>
                    <Tooltip
                        title='Remove teacher'
                        placement='top'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span>
                            <IconButton
                                className={classes.delete}
                            >
                                <DeleteIcon fontSize='small'/>
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    )
};

TeacherItem.propTypes = {
    teacher: PropTypes.object.isRequired
};

export default TeacherItem
