import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {TableRow, TableCell} from "@material-ui/core";
import StudentRatingItem from "../../common/StudentRatingItem/StudentRatingItem";
import {style} from "../../../styles/global";

const useStyles = makeStyles({
    ratings: {
        lineHeight: '40px',
        padding: style.baseSize
    }
});

const RatingSubject = props => {
    const {rating} = props;
    const classes = useStyles();

    return (
        <TableRow>
            <TableCell>{rating.subject}</TableCell>
            <TableCell className={classes.ratings}>
                {rating.ratings.map(item => {
                    return <StudentRatingItem key={item._id} rating={item}/>
                })}
            </TableCell>
        </TableRow>
    )
};

RatingSubject.propTypes = {
    rating: PropTypes.object.isRequired
};

export default RatingSubject;
