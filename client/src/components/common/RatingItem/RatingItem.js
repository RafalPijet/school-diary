import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import componentStyle from "./RatingItemStyle";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => componentStyle(theme));

const RatingItem = props => {
    const {rating, ...otherProps} = props;
    const classes = useStyles();
    const [ratingStyle, setRatingStyle] = useState(classes.ratingNumber);

    useEffect(() => {
        setRatingStyle(clsx(ratingStyle, classes[rating.scales]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className={classes.root}>
            <Typography
                className={ratingStyle}
                display='inline'
                variant='subtitle1'
                {...otherProps}
                onMouseEnter={() => setRatingStyle(clsx(ratingStyle, classes.ratingNumberBig))}
                onMouseLeave={() => setRatingStyle(clsx(classes[rating.scales], classes.ratingNumber))}
            >
                {rating.value}
            </Typography>
        </div>
    )
};

RatingItem.propTypes = {
    rating: PropTypes.object.isRequired,
    isNewRating: PropTypes.object,
    setRatingValue: PropTypes.func
};

export default RatingItem;
