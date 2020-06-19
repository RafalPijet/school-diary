import React from "react";
import PropTypes from 'prop-types';
import clsx from "clsx";
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
                <Grid item lg={2} className={clsx(classes.item, classes.center)}>
                    <Typography align='center'>
                        {student.birthDate.substring(0, 10)}
                    </Typography>
                </Grid>
                <Grid item lg={2} className={clsx(classes.item, classes.center)}>
                    <Typography align='center'>
                        {student.className}
                    </Typography>
                </Grid>
                <Grid item lg={4} className={clsx(classes.item, classes.center)}>
                    <div className={classes.parentsBox}>
                        {student.parents.length ?
                            student.parents.map((item, i) => {
                                return (
                                    <div key={i} className={classes.parents}>
                                        <Link href={`mailto: ${item.email}`}>{`${item.name}; `}</Link>
                                        <Typography variant='subtitle2'>{item.phone}</Typography>
                                    </div>
                                )
                            }) :
                            <Typography>none</Typography>
                        }
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
};

TeacherStudentItem.propTypes = {
    student: PropTypes.object.isRequired
};

export default TeacherStudentItem;
