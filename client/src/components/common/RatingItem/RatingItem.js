import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import componentStyle from "./RatingItemStyle";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => componentStyle(theme));

const RatingItem = props => {
    const {
        rating,
        previewHandling,
        updateHandling,
        isUpdateRating,
        setIsUpdateRating,
        isNewRating,
        ...otherProps
    } = props;
    const classes = useStyles();
    const [ratingStyle, setRatingStyle] = useState(classes.ratingNumber);
    const [isFrozen, setIsFrozen] = useState(false);

    useEffect(() => {
        setRatingStyle(clsx(ratingStyle, classes[rating.scales]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdateRating]);

    const enterMouseHandling = () => {
        setRatingStyle(clsx(ratingStyle, classes.ratingNumberBig));
        previewHandling(true, {
            description: rating.description,
            date: rating.date.substring(0, 10),
            scales: rating.scales
        });
    };

    const leaveMouseHandling = () => {
        setRatingStyle(clsx(classes[rating.scales], classes.ratingNumber));
        previewHandling(false, {description: '', date: '', scales: 0});
    };

    const updateItemHandling = () => {
        if (!isNewRating) {
            updateHandling(rating);
            setIsUpdateRating(true);
            setIsFrozen(true);
        }
    };

    const cancelUpdate = () => {
        if (!isNewRating) {
            setIsUpdateRating(false);
            setIsFrozen(false);
            updateHandling(rating);
        }
    };

    return (
        <div className={classes.root}>
            <Typography
                className={(isUpdateRating && !isFrozen) ? classes.disabled : ratingStyle}
                display='inline'
                variant='subtitle1'
                {...otherProps}
                onMouseEnter={(!isUpdateRating && !isFrozen) ? enterMouseHandling : null}
                onMouseLeave={(!isUpdateRating && !isFrozen) ? leaveMouseHandling : null}
                onClick={(!isUpdateRating && !isFrozen) ? updateItemHandling : cancelUpdate}
            >
                {rating.value}
            </Typography>

        </div>
    )
};

RatingItem.propTypes = {
    rating: PropTypes.object.isRequired,
    isNewRating: PropTypes.bool.isRequired,
    setRatingValue: PropTypes.func,
    previewHandling: PropTypes.func.isRequired,
    updateHandling: PropTypes.func.isRequired,
    isUpdateRating: PropTypes.bool.isRequired,
    setIsUpdateRating: PropTypes.func.isRequired
};

export default RatingItem;
