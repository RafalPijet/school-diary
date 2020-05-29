import React from "react";
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography, Grid, Tooltip, IconButton, Fade} from "@material-ui/core";
import Parents from '@material-ui/icons/Wc';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import componentStyle from "./StudentItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const StudentItem = props => {
    const {id, firstName, lastName, birthDate, className, parents} = props.student;
    const {request, setModalYesNot} = props;
    const classes = useStyles();
    return (
        <Paper className={classes.root} variant='outlined'>
            <Grid container>
                <Grid item lg={6} className={classes.names}>
                    <Typography display='inline'>{`${lastName} ${firstName}`}</Typography>
                </Grid>
                <Grid item lg={2} className={clsx(classes.names, classes.justifyCenter)}>
                    <Typography display='inline'>{birthDate.substring(0, 10)}</Typography>
                </Grid>
                <Grid item lg={2} className={clsx(classes.names, classes.justifyCenter)}>
                    <Typography display='inline'>{className}</Typography>
                </Grid>
                <Grid item lg={2} className={classes.buttons}>
                    <Tooltip
                        title='Parents'
                        placement='top'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={request.updating && classes.progress}>
                            <IconButton
                                disabled={!parents.length || request.updating}
                            >
                                <Parents fontSize='small'/>
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip
                        title='Edit'
                        placement='top'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={request.updating && classes.progress}>
                            <IconButton
                                className={classes.edit}
                                disabled={request.updating}
                            >
                                <EditIcon fontSize='small'/>
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip
                        title='Delete'
                        placement='top'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={request.updating && classes.progress}>
                            <IconButton
                                className={classes.delete}
                                disabled={request.updating}
                                onClick={() => setModalYesNot(true, {
                                    description: `Do you want remove student ${lastName} ${firstName}?`,
                                    data: {studentId: id, className}
                                })}
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

StudentItem.propTypes = {
    student: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    setModalYesNot: PropTypes.func.isRequired
};

export default StudentItem;
