import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Grid, Typography} from "@material-ui/core";
import StudentRatingItem from "../../common/StudentRatingItem/StudentRatingItem";
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    root: {
        padding: style.baseSize,
        backgroundColor: theme.palette.action.item,
        marginBottom: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.action.check
        }
    },
    ratings: {
        lineHeight: '40px'
    }
}));

const RatingSubject = props => {
    const {rating} = props;
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={5}>
            <Grid container alignItems='center' justify='center'>
                <Grid item lg={2}>
                    <Typography>{rating.subject}</Typography>
                </Grid>
                <Grid item lg={10} className={classes.ratings}>
                    {rating.ratings.map(item => {
                        return <StudentRatingItem key={item._id} rating={item}/>
                    })}
                </Grid>
            </Grid>
        </Paper>
    )
};

RatingSubject.propTypes = {
    rating: PropTypes.object.isRequired
};

export default RatingSubject;
