import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import componentStyle from "./RatingOptionsStyle";
import Rating from '@material-ui/lab/Rating';
import {Typography, FormControl, Select, MenuItem, Tooltip, IconButton, Fade} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => componentStyle(theme));

const labels = {
    0.5: '1',
    1: '1+',
    1.5: '2-',
    2: '2',
    2.5: '2+',
    3: '3-',
    3.5: '3',
    4: '3+',
    4.5: '4-',
    5: '4',
    5.5: '4+',
    6: '5-',
    6.5: '5',
    7: '5+',
    7.5: '6-',
    8: '6'
};

const RatingOptions = props => {
    const {ratingScales, ratingDescriptions, ratingsId, teacher, addRating, classId, addingHandling} = props;
    const [value, setValue] = useState(3.5);
    const [hover, setHover] = useState(-1);
    const [scales, setScales] = useState(ratingScales[0]);
    const [description, setDescription] = useState(ratingDescriptions[0]);
    const classes = useStyles();

    const setColor = isValue => {
        switch (scales) {
            case 1:
                return isValue ? classes.scales1 : classes[0];
            case 2:
                return isValue ? classes.scales2 : classes[1];
            case 3:
                return isValue ? classes.scales3 : classes[2];
            default:
                break;
        }
    };

    const addRatingHandling = () => {
        let dataPackage = {
            ratingsId,
            rating: {
                value: labels[value],
                description,
                scales,
                date: new Date(),
                teacher: `${teacher.firstName} ${teacher.lastName}`
            }
        };
        addRating(classId, dataPackage);
        addingHandling(ratingsId);
    };

    return (
        <div className={classes.root}>
            <div className={classes.ratingRow}>
                <Rating
                    name={`rating-stars-${ratingsId}`}
                    size='small'
                    max={8}
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                />
                <div className={classes.valueBox}>
                    <Typography className={setColor(true)}>{labels[hover !== -1 ? hover : value]}</Typography>
                </div>
            </div>
            <div className={classes.ratingRow}>
                <FormControl>
                    <Select
                        value={scales}
                        className={setColor(false)}
                        onChange={e => setScales(e.target.value)}
                        style={{fontSize: '14px'}}
                    >
                        {ratingScales.map(item => {
                            return <MenuItem
                                className={classes[item - 1]}
                                style={{fontSize: '14px'}}
                                key={item}
                                value={item}>
                                {item}
                            </MenuItem>
                        })}

                    </Select>
                </FormControl>
                <FormControl>
                    <Select
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{fontSize: '14px'}}
                    >
                        {ratingDescriptions.map(item => {
                            return <MenuItem style={{fontSize: '14px'}} key={item} value={item}>{item}</MenuItem>
                        })}

                    </Select>
                </FormControl>
                <div>
                    <span>
                    <Tooltip
                        title='confirm rating'
                        arrow
                        placement='bottom'
                        TransitionComponent={Fade}
                        TransitionProps={{timeout: 1000}}
                    >
                <span>
                    <IconButton
                        className={classes.buttonBox}
                        aria-label='done'
                        onClick={addRatingHandling}
                    >
                    {<DoneIcon fontSize='small'/>}
                    </IconButton>
                </span>
                </Tooltip>
                </span>
                </div>
            </div>
        </div>
    )
};

RatingOptions.propTypes = {
    ratingScales: PropTypes.array.isRequired,
    ratingDescriptions: PropTypes.array.isRequired,
    ratingsId: PropTypes.string.isRequired,
    teacher: PropTypes.object.isRequired,
    addRating: PropTypes.func.isRequired,
    classId: PropTypes.string.isRequired,
    addingHandling: PropTypes.func.isRequired
};

export default RatingOptions;
