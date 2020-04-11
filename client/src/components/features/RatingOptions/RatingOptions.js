import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {style} from "../../../styles/global";
import {InputLabel} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80px',
        width: '180px'
    },
    ratingRow: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    valueBox: {
        display: 'inline-flex',
        width: '30px',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: style.smallSize
    },
    ratingValue: {
        fontSize: style.middleSize,
        fontWeight: 700,
        paddingLeft: theme.spacing(1),
        color: theme.palette.action.dark
    }
}));

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
    const {ratingScales, ratingDescriptions} = props;
    const [value, setValue] = useState(3.5);
    const [hover, setHover] = useState(-1);
    const [scales, setScales] = useState(ratingScales[0]);
    const [description, setDescription] = useState(ratingDescriptions[0]);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.ratingRow}>
                <Rating
                    name="rating-stars"
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
                    <Typography className={classes.ratingValue}>{labels[hover !== -1 ? hover : value]}</Typography>
                </div>
            </div>
            <div className={classes.ratingRow}>
                <FormControl>
                    <Select
                        value={scales}
                        onChange={e => setScales(e.target.value)}
                        style={{fontSize: '14px'}}
                    >
                        {ratingScales.map(item => {
                            return <MenuItem style={{fontSize: '14px'}} key={item} value={item}>{item}</MenuItem>
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
            </div>
        </div>
    )

};

RatingOptions.propTypes = {
    ratingScales: PropTypes.array.isRequired,
    ratingDescriptions: PropTypes.array.isRequired
};

export default RatingOptions;
