import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {useSpring, animated} from "react-spring";
import {Paper, Typography} from "@material-ui/core";
import RatingItem from '../../common/RatingItem/RatingItemContainer';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RatingOptions from '../../features/RatingOptions/RatingOptionsContainer';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from "@material-ui/core/Tooltip";
import componentStyle from "./DiaryRowStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const DiaryRow = props => {
    const {
        student, addRating, i, isNewRating, isPlus, teacher, request, ratingValue, selectedDescription,
        selectedScales, setDescription, setIsNewRating, setIsPlus, setRatingValue, setScales, classId,
        isUpdateRating} = props;
    const [studentRatings, setStudentRatings] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [ratingsId, setRatingsId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);
    const [isOpenPreview, setIsOpenPreview] = useState(false);
    const [previewContent, setPreviewContent] = useState({
        description: '',
        date: '',
        scales: 0
    });
    const [flipped, setFlipped] = useState(false);
    const {transform, opacity} = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: {mass: 5, tension: 500, friction: 80}
    });
    const classes = useStyles();

    useEffect(() => {
        student.ratings.forEach(item => {

            if (teacher.subject === item.subject) {
                setStudentRatings(item.ratings);
                setRatingsId(item.id);
                setStudentId(student.id);
            }
        });

        if (!request.adding) setIsSpinner(false);
    }, [teacher, student, request.adding]);

    const addingHandling = idOptions => {
        setIsOpen(false);
        setIsSpinner(idOptions === ratingsId)
    };

    const previewHandling = (isOpen, data) => {
        setIsOpenPreview(isOpen);
        setPreviewContent(data)
    };

    const updateHandling = rating => {
        console.log(rating);
        setFlipped(!flipped);
    };

    return (
        <TableRow hover>
            <TableCell className={clsx(classes.firstCell, classes.padding)} align='center'>{i + 1}</TableCell>
            <TableCell className={clsx(classes.padding, classes.secondCell)} align='left'>
                <Typography className={classes.names}>{`${student.lastName} ${student.firstName}`}</Typography>
            </TableCell>
            <TableCell className={clsx(classes.padding, classes.thirdCell)} align='left'>
                <div className={classes.previewRoot}>
                    <div className={isOpenPreview ? classes.showUpdate : classes.hiddenUpdate}>
                        <animated.div
                            className={classes.flipped}
                            style={{opacity: opacity.interpolate(o => 1 - o), transform}}>
                            <Paper elevation={9} className={classes.preview}>
                                <Typography className={classes[previewContent.scales]}
                                            variant='subtitle2'>{previewContent.description}</Typography>
                                <Typography className={classes[previewContent.scales]}
                                            variant='subtitle2'>{previewContent.date}</Typography>
                            </Paper>
                        </animated.div>
                        <animated.div
                            className={classes.flipped}
                            style={{opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`)}}>
                            <Paper elevation={9} className={classes.preview}>
                                <p>TEST</p>
                            </Paper>
                        </animated.div>
                    </div>
                </div>
                <span className={classes.ratings}>
                    {studentRatings.map(rating => {
                        return (
                            <Fragment key={rating._id}>
                                <span>
                                    <Tooltip
                                        title={isUpdateRating ? '' : 'update rating'}
                                        arrow
                                        placement='bottom'
                                        TransitionComponent={Fade}
                                        enterDelay={3000}
                                    >
                                        <span>
                                            <RatingItem
                                                previewHandling={previewHandling}
                                                updateHandling={updateHandling}
                                                rating={rating}/>
                                        </span>
                                    </Tooltip>
                                </span>

                            </Fragment>
                        )
                    })}
                    <div className={classes.spinnerBox}>
                        {(request.adding && isSpinner) && <CircularProgress size='20px' color='secondary'/>}
                    </div>
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
                         disabled={isUpdateRating}
                     >
                    {<AddIcon
                        className={!isUpdateRating ?
                            (isOpen ? classes.buttonCancel : classes.buttonAdd) : classes.disabled}/>}
                    </IconButton>
                </span>
                </Tooltip>
                </span>
                    <Zoom in={isOpen}>
                        <Paper elevation={9} className={classes.adding}>
                            <RatingOptions addingHandling={addingHandling} classId={classId} ratingsId={ratingsId}
                                           teacher={teacher}/>
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
    classId: PropTypes.string.isRequired,
    teacher: PropTypes.object.isRequired,
    setIsNewRating: PropTypes.func.isRequired,
    setRatingValue: PropTypes.func.isRequired,
    isNewRating: PropTypes.object.isRequired,
    ratingValue: PropTypes.string.isRequired,
    selectedDescription: PropTypes.string.isRequired,
    selectedScales: PropTypes.number.isRequired,
    setDescription: PropTypes.func.isRequired,
    setScales: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    isUpdateRating: PropTypes.bool.isRequired
};

export default DiaryRow;
