import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Paper} from "@material-ui/core";
import RatingItem from '../../common/RatingItem/RatingItem';
import TableRow from '@material-ui/core/TableRow';
import Typography from "@material-ui/core/Typography";
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RatingOptions from '../../features/RatingOptions/RatingOptionsContainer';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from "@material-ui/core/Tooltip";
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    buttonBox: {
        display: 'inline-flex',
        width: '50px',
        height: '50px',
        alignItems: 'center',
        position: 'relative'
    },
    adding: {
        position: 'absolute',
        left: '-200px',
        top: '-33px',
        zIndex: '20',
        backgroundColor: theme.palette.action.adding
    },
    buttonAdd: {
        color: theme.palette.action.dark,
        transition: '1s'
    },
    buttonCancel: {
        color: theme.palette.action.warning,
        transform: 'rotate(45deg)',
        transition: '1s'
    },
    padding: {
        padding: style.smallSize
    },
    firstCell: {
        width: style.baseSize,
    },
    secondCell: {
        width: '200px',
        overflowX: 'auto'
    },
    thirdCell: {
        width: '720px',
    },
    names: {
        whiteSpace: 'nowrap',
        width: '200px',
    },
    ratings: {
        width: '666px',
        display: 'inline-flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        height: '40px',
    }
}));

const DiaryRow = props => {
    const {
        student, addRating, i, isNewRating, isPlus, teacher, request, ratingValue, selectedDescription,
        selectedScales, setDescription, setIsNewRating, setIsPlus, setRatingValue, setScales
    } = props;
    const [studentRatings, setStudentRatings] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [ratingsId, setRatingsId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        student.ratings.forEach(item => {

            if (teacher.subject === item.subject) {
                setStudentRatings(item.ratings);
                setRatingsId(item.id);
                setStudentId(student.id);
            }
        });
    }, [teacher, student]);


    return (
        <TableRow hover>
            <TableCell className={clsx(classes.firstCell, classes.padding)} align='center'>{i + 1}</TableCell>
            <TableCell className={clsx(classes.padding, classes.secondCell)} align='left'>
                <Typography className={classes.names}>{`${student.lastName} ${student.firstName}`}</Typography>
            </TableCell>
            <TableCell className={clsx(classes.padding, classes.thirdCell)} align='left'>
                <span className={classes.ratings}>
                    {studentRatings.map(rating => {
                        return (
                            <RatingItem key={rating._id} rating={rating}/>
                        )
                    })}
                </span>
                <div className={classes.buttonBox}>
                <span>
                    <Tooltip
                        title={isOpen ? 'cancel adding' : 'add rating'}
                        arrow
                        placement='bottom'
                        TransitionComponent={Fade}
                        TransitionProps={{timeout: 1000}}
                    >
                <span>
                     <IconButton
                         aria-label='add'
                         onClick={() => setIsOpen(!isOpen)}
                     >
                    {<AddIcon className={isOpen ? classes.buttonCancel : classes.buttonAdd}/>}
                    </IconButton>
                </span>
                </Tooltip>
                </span>
                    <Zoom in={isOpen}>
                        <Paper elevation={9} className={classes.adding}>
                            <RatingOptions/>
                        </Paper>
                    </Zoom>
                </div>
            </TableCell>
        </TableRow>
    )

};

DiaryRow.propTypes = {
    student: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    teacher: PropTypes.object.isRequired,
    isPlus: PropTypes.bool,
    setIsPlus: PropTypes.func.isRequired,
    setIsNewRating: PropTypes.func.isRequired,
    setRatingValue: PropTypes.func.isRequired,
    isNewRating: PropTypes.object.isRequired,
    ratingValue: PropTypes.string.isRequired,
    selectedDescription: PropTypes.string.isRequired,
    selectedScales: PropTypes.number.isRequired,
    setDescription: PropTypes.func.isRequired,
    setScales: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default DiaryRow;
