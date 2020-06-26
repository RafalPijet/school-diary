import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    Grid,
    Typography
} from "@material-ui/core";
import RatingSubject from '../../features/RatingSubject/RatingSubject';
import componentStyle from './RatingSubjectListStyle';

const useStyles = makeStyles(theme => componentStyle(theme));

const RatingSubjectList = props => {
    const {student} = props;
    const classes = useStyles();

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container style={{paddingLeft: '10px'}}>
                <Grid item lg={2}>
                    <Typography variant='subtitle2' className={classes.title}>Subject</Typography>
                </Grid>
                <Grid item lg={10}>
                    <Typography variant='subtitle2' className={classes.title} align='center'>Ratings</Typography>
                </Grid>
            </Grid>
            <div className={classes.content}>
                {student.ratings.map(item => {
                    return <RatingSubject key={item.id} rating={item}/>
                })}
            </div>
        </Paper>
    )
};

RatingSubjectList.propTypes = {
    student: PropTypes.object.isRequired
};

export default RatingSubjectList;
