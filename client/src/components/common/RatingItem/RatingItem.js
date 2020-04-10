import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip, Typography} from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-flex',
        width: '30px',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingNumber: {
        padding: `0 ${theme.spacing(1)}px`,
        cursor: 'pointer'
    },
    ratingNumberBig: {
        padding: `0 ${theme.spacing(1)}px`,
        cursor: 'pointer',
        fontSize: '22px',
        fontWeight: '700',
        transition: '.5s'
    }
}));

const TooltipContent = rating => {
    return (
        <div>
            <Typography variant='subtitle2'>{`scales: ${rating.scales}`}</Typography>
            <Typography variant='subtitle2'>{`description: ${rating.description}`}</Typography>
            <Typography variant='subtitle2'>{`date: ${rating.date.substring(0, 10)}`}</Typography>
        </div>
    )
};

const RatingItem = props => {
    const {rating, ...otherProps} = props;
    const classes = useStyles();
    const [ratingStyle, setRatingStyle] = useState(classes.ratingNumber);

    return (
        <Tooltip title={TooltipContent(rating)} arrow placement='top' TransitionComponent={Zoom}>
            <div className={classes.root}>
                <Typography
                    className={ratingStyle}
                    display='inline'
                    variant='subtitle1'
                    {...otherProps}
                    onMouseEnter={() => setRatingStyle(classes.ratingNumberBig)}
                    onMouseLeave={() => setRatingStyle(classes.ratingNumber)}
                >
                {rating.value}
            </Typography>
            </div>
        </Tooltip>
    )
};

RatingItem.propTypes = {
    rating: PropTypes.object.isRequired,
    isNewRating: PropTypes.object,
    setRatingValue: PropTypes.func
};

export default RatingItem;
