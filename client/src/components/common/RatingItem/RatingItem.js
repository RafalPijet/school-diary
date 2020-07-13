import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import CircularProgress from '@material-ui/core/CircularProgress';
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
        updatedRating,
        request,
        ...otherProps
    } = props;
    const classes = useStyles();
    const [ratingItem, setRatingItem] = useState(rating);
    const [ratingItemCopy, setRatingItemCopy] = useState(rating);
    const [ratingStyle, setRatingStyle] = useState(classes.ratingNumber);
    const [isFrozen, setIsFrozen] = useState(false);

    useEffect(() => {

        if (updatedRating._id === ratingItem._id && isFrozen) {
            setRatingItem(updatedRating);
            setRatingStyle(clsx(classes.ratingNumberBig, classes[ratingItem.scales]))
        } else {
            setRatingStyle(clsx(isFrozen ? classes.ratingNumberBig : classes.ratingNumber,
                classes[ratingItem.scales]));
        }

        if (!isUpdateRating && isFrozen) {
            !request.working && setIsFrozen(false);
            setRatingStyle(clsx(classes.ratingNumber, classes[ratingItem.scales]));
            setRatingItemCopy(ratingItem);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdateRating, updatedRating, updatedRating._id, ratingItem, request.working]);

    const enterMouseHandling = () => {
        setRatingStyle(clsx(ratingStyle, classes.ratingNumberBig));
        previewHandling(true, {
            description: ratingItem.description,
            date: ratingItem.date.substring(0, 10),
            scales: ratingItem.scales
        });
    };

    const leaveMouseHandling = () => {
        setRatingStyle(clsx(classes[ratingItem.scales], classes.ratingNumber));
        previewHandling(false, {description: '', date: '', scales: 0});
    };

    const updateItemHandling = () => {

        if (!isNewRating) {
            updateHandling(ratingItem);
            setIsUpdateRating(true);
            setIsFrozen(true);
        }
    };

    const cancelUpdate = () => {

        if (!isNewRating) {
            setIsUpdateRating(false);
            setIsFrozen(false);
            updateHandling(ratingItemCopy);

            if (ratingItemCopy.value !== ratingItem.value ||
            ratingItemCopy.scrollable !== ratingItem.scales ||
            ratingItemCopy.description !== ratingItem.description) setRatingItem(ratingItemCopy);
        }
    };

    return (
        <div className={classes.root}>
            {(request.working && isFrozen) ? <CircularProgress size='25px' color='secondary'/> :
                <Typography
                    className={(isUpdateRating && !isFrozen) ? classes.disabled : ratingStyle}
                    display='inline'
                    variant='subtitle1'
                    {...otherProps}
                    onMouseEnter={(!isUpdateRating && !isFrozen) ? enterMouseHandling : null}
                    onMouseLeave={(!isUpdateRating && !isFrozen) ? leaveMouseHandling : null}
                    onClick={(!isUpdateRating && !isFrozen) ? updateItemHandling : cancelUpdate}
                >
                    {ratingItem.value}
                </Typography>
            }
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
    setIsUpdateRating: PropTypes.func.isRequired,
    updatedRating: PropTypes.object,
    request: PropTypes.object.isRequired
};

export default RatingItem;
