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
        student, i, isNewRating, teacher, request, setIsNewRating, classId,
        isUpdateRating, setIsUpdateRating
    } = props;
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
    const [ratingToChange, setRatingToChange] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [updatedRating, setUpdatedRating] = useState({});
    const {transform, opacity, visibility} = useSpring({
        opacity: flipped ? 1 : 0,
        visibility: flipped ? 'visible' : 'hidden',
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
        if (request.working && isOpenPreview) {
            setIsOpenPreview(false);
            setFlipped(!flipped);
        }
        if (request.success && !isOpenPreview) {
            setIsUpdateRating(false);
            setIsUpdate(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacher, student, request.adding, isNewRating, request.working, request.success, flipped]);

    const addingHandling = idOptions => {
        setIsOpen(false);
        setIsSpinner(idOptions === ratingsId);
        setIsNewRating(false);
    };

    const addingOptionHandling = () => {
        if (isOpen) {
            setIsOpen(false);
            setIsNewRating(false);
        } else {
            if (!isNewRating) {
                setIsOpen(true);
                setIsNewRating(true);
            }
        }
    };

    const previewHandling = (isOpen, data) => {
        setIsOpenPreview(isOpen);
        setPreviewContent(data)
    };

    const updateHandling = rating => {
        rating.studentId = studentId;
        rating.classId = classId;
        setRatingToChange(rating);
        setIsUpdate(!isUpdate);
        setFlipped(!flipped);
    };

    const changeRatingHandling = newRating => {
        setUpdatedRating(newRating);
    };

    return (
        <TableRow hover>
            <TableCell style={{padding: 0}} className={clsx(classes.firstCell, classes.padding)} align='center'>
                {i + 1}
            </TableCell>
            <TableCell className={clsx(classes.padding, classes.secondCell)} align='left'>
                <Typography className={classes.names}>{`${student.lastName} ${student.firstName}`}</Typography>
            </TableCell>
            <TableCell className={clsx(classes.padding, classes.thirdCell)} align='left'>
                <div className={classes.previewRoot}>
                    <div className={clsx(classes.previewContent,
                        isOpenPreview ? classes.showUpdate : classes.hiddenUpdate)}>
                        <animated.div
                            className={classes.flipped}
                            style={{opacity: opacity.interpolate(o => 1 - o), visibility: !visibility, transform}}>
                            <Paper elevation={9} className={classes.preview}>
                                <Typography className={classes[previewContent.scales]}
                                            variant='subtitle2'>{previewContent.description}</Typography>
                                <Typography className={classes[previewContent.scales]}
                                            variant='subtitle2'>{previewContent.date}</Typography>
                            </Paper>
                        </animated.div>
                        <animated.div
                            className={classes.flipped}
                            style={{opacity, visibility, transform: transform.interpolate(t => `${t} rotateX(180deg)`)}}>
                            <Paper elevation={9} className={classes.preview}>
                                <RatingOptions
                                    changeRating={changeRatingHandling}
                                    isEditMode={true}
                                    classId={classId}
                                    ratingsId={ratingsId}
                                    ratingToChange={ratingToChange}
                                    isUpdate={isUpdate}
                                />
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
                                        title={isNewRating ? '' : (isUpdateRating ? 'cancel update' : 'update grade')}
                                        arrow
                                        placement='bottom'
                                        TransitionComponent={Fade}
                                        enterDelay={3000}
                                    >
                                        <span>
                                            <RatingItem
                                                previewHandling={previewHandling}
                                                updateHandling={updateHandling}
                                                updatedRating={updatedRating}
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
            </TableCell>
            <TableCell>
                <div className={classes.buttonBox}>
                <span>
                    <Tooltip
                        title={(isNewRating && !isOpen) ? '' : (isOpen ? 'cancel adding' : 'add grade')}
                        arrow
                        placement='bottom'
                        TransitionComponent={Fade}
                        TransitionProps={{timeout: 1000}}
                    >
                <span>
                     <IconButton
                         aria-label='add'
                         onClick={addingOptionHandling}
                         disabled={isUpdateRating}
                     >
                    {<AddIcon
                        className={((!isUpdateRating && !isNewRating) || (isOpen && isNewRating)) ?
                            (isOpen ? classes.buttonCancel : classes.buttonAdd) : classes.disabled}/>}
                    </IconButton>
                </span>
                </Tooltip>
                </span>
                    <Zoom in={isOpen}>
                        <Paper elevation={9} className={classes.adding}>
                            <RatingOptions isEditMode={false} addingHandling={addingHandling} classId={classId}
                                           ratingsId={ratingsId} teacher={teacher}/>
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
    isNewRating: PropTypes.bool.isRequired,
    request: PropTypes.object.isRequired,
    isUpdateRating: PropTypes.bool.isRequired,
    setIsUpdateRating: PropTypes.func.isRequired
};

export default DiaryRow;
