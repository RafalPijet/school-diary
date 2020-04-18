import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import componentStyle from "./RatingOptionsStyle";
import Rating from '@material-ui/lab/Rating';
import {Typography, FormControl, Select, MenuItem, Tooltip, IconButton, Fade} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
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
    const {
        ratingScales,
        ratingDescriptions,
        ratingsId,
        teacher,
        addRating,
        classId,
        addingHandling,
        isEditMode,
        changeRating,
        ratingToChange,
        isUpdate
    } = props;
    const [value, setValue] = useState(3.5);
    const [hover, setHover] = useState(-1);
    const [scales, setScales] = useState(ratingScales[0]);
    const [description, setDescription] = useState(ratingDescriptions[0]);
    const classes = useStyles();

    useEffect(() => {
        // if (isEditMode) changeRating(labels[value]);
        if (isEditMode && isUpdate) {
            setDescription(ratingToChange.description);
            setScales(ratingToChange.scales);

            // console.log(Object.values(labels));
            console.log(ratingToChange.value);
            console.log(Object.keys(labels));
            console.log(Object.values(labels));
            console.log(Object.values(labels).indexOf(ratingToChange.value));

            // console.log(Object.keys(labels));
        }
    }, [value, changeRating, ratingToChange, isEditMode, isUpdate]);

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

    const deleteRatingHandling = () => {
        console.log('delete')
    };

    const updateRatingHandling = () => {
        console.log('update')
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
                {isEditMode ? <div className={classes.deleteBox}>
                    <span>
                    <Tooltip
                        title='delete rating'
                        arrow
                        id='delete'
                        placement='top'
                        TransitionComponent={Fade}
                        TransitionProps={{timeout: 1000}}
                    >
                <span>
                    <IconButton
                        className={classes.buttonBox}
                        aria-label='delete'
                        onClick={deleteRatingHandling}
                    >
                    {<DeleteIcon className={classes.deleteIcon} fontSize='small'/>}
                    </IconButton>
                </span>
                </Tooltip>
                </span>
                </div> : <div className={classes.valueBox}>
                    <Typography className={setColor(true)}>{labels[hover !== -1 ? hover : value]}</Typography>
                </div>}
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
                        title={isEditMode ? 'confirm update' : 'confirm adding'}
                        arrow
                        id='confirm'
                        placement='bottom'
                        TransitionComponent={Fade}
                        TransitionProps={{timeout: 1000}}
                    >
                <span>
                    <IconButton
                        className={classes.buttonBox}
                        aria-label='done'
                        onClick={isEditMode ? updateRatingHandling : addRatingHandling}
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
    teacher: PropTypes.object,
    addRating: PropTypes.func,
    classId: PropTypes.string.isRequired,
    addingHandling: PropTypes.func,
    isEditMode: PropTypes.bool.isRequired,
    changeRating: PropTypes.func,
    ratingToChange: PropTypes.object,
    isUpdate: PropTypes.bool
};

export default RatingOptions;
