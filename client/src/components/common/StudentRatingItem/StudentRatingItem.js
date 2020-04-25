import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip, Typography} from "@material-ui/core";
import Zoom from '@material-ui/core/Zoom';
import componentStyle from "./StudentRatingItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TooltipContent = rating => {
    const {scales, description, date, teacher} = rating;

    return (
        <div>
            <Typography variant='subtitle2'>{`scales: ${scales}`}</Typography>
            <Typography variant='subtitle2'>{`description: ${description}`}</Typography>
            <Typography variant='subtitle2'>{`date: ${date.substring(0, 10)}`}</Typography>
            <Typography variant='subtitle2'>{`teacher: ${teacher}`}</Typography>
        </div>
    )
};

const StudentRatingItem = props => {
    const {rating} = props;
    const classes = useStyles();
    const [ratingStyle, setRatingStyle] = useState(classes.ratingNumber);

    return (
        <Tooltip
            classes={{tooltip: classes.tooltip}}
            title={TooltipContent(rating)}
            arrow
            placement='top'
            TransitionComponent={Zoom}
        >
            <div className={classes.root}>
                <Typography
                    className={clsx(ratingStyle, classes[rating.scales])}
                    display='inline'
                    variant='subtitle1'
                    onMouseEnter={() => setRatingStyle(classes.ratingNumberBig)}
                    onMouseLeave={() => setRatingStyle(classes.ratingNumber)}
                >
                    {rating.value}
                </Typography>
            </div>
        </Tooltip>
    )
};

StudentRatingItem.propTypes = {
    rating: PropTypes.shape({
        _id: PropTypes.string,
        value: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        scales: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        teacher: PropTypes.string
    })
};

export default StudentRatingItem;
