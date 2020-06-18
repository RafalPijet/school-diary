import React from "react";
import PropTypes from 'prop-types';
import {
    Paper,
    Grid,
    Typography,
    Link
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import componentStyle from "./TeacherStudentItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeacherStudentItem = props => {
    const {student} = props;
    const classes = useStyles();

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container>
                <Grid item lg={4} className={classes.item}>
                    <Typography style={{fontWeight: 700}} display='inline'>
                        {student.name}
                    </Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center'>
                        {student.birthDate}
                    </Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center'>
                        {student.className}
                    </Typography>
                </Grid>
                <Grid item lg={4}>
                    <Typography>Parents</Typography>
                </Grid>
            </Grid>
        </Paper>
    )
};

TeacherStudentItem.propTypes = {
    student: PropTypes.object.isRequired
};

export default TeacherStudentItem;
