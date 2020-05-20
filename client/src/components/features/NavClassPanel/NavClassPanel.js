import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {
    Paper,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    IconButton,
    Tooltip,
    Fade,
    TextField,
    Zoom
} from "@material-ui/core";
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SchoolIcon from '@material-ui/icons/School';
import DoneIcon from '@material-ui/icons/Done';
import componentStyle from "./NavClassPanelStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const NavClassPanel = props => {
    const {
        request,
        classId,
        tutor,
        possibleTutors,
        getModeStatus, subjects,
        getSelectedSubject,
        getFilteredStudents,
        isChanging,
        updateTutor,
        confirmUpdate,
        getIsTutor
    } = props;
    const classes = useStyles();
    const [newTutor, setNewTutor] = useState('unselected');
    const [isPossible, setIsPossible] = useState(false);
    const [isStudentsMode, setIsStudentsMode] = useState(false);
    const [isTeachersMode, setIsTeachersMode] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [filteredStudents, setFilteredStudents] = useState('');

    useEffect(() => {
        setIsPossible(newTutor !== 'unselected' && !isStudentsMode && !isTeachersMode);
        getModeStatus(isStudentsMode, isTeachersMode);

        if (request.updating) {
            setIsStudentsMode(false);
            setIsTeachersMode(false);
            setIsPossible(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTutor, isStudentsMode, isTeachersMode, request.updating]);

    const handleNewTutor = event => {
        setNewTutor(event.target.value)
    };

    const handleSelectedSubject = event => {
        setSelectedSubject(event.target.value);
        getSelectedSubject(event.target.value);
    };

    const handleFilteredStudents = event => {
        setFilteredStudents(event.target.value);
        getFilteredStudents(event.target.value);
    };

    const replaceTutorHandling = () => {

        if (newTutor !== 'unselected') {
            updateTutor({id: classId, mainTeacher: newTutor});
            setNewTutor('unselected');
            getIsTutor(true)
        }
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item lg={5}>
                    <div className={classes.descTutor}>
                        <Typography display='inline' component='p' color='textSecondary'>
                            tutor:
                        </Typography>
                        <Typography
                            display='inline'
                            component='p'
                            color='textPrimary'
                            style={{paddingLeft: '10px', fontWeight: 700}}
                        >
                            {` ${tutor.lastName} ${tutor.firstName}`}
                        </Typography>
                    </div>
                    <div className={classes.selectTutor}>
                        <FormControl
                            disabled={isTeachersMode || isStudentsMode || request.updating}
                            className={classes.selectInput}
                        >
                            <InputLabel id='replace-tutor'>
                                replace tutor
                            </InputLabel>
                            <Select
                                labelId='replace-tutor'
                                value={newTutor}
                                onChange={handleNewTutor}
                            >
                                <MenuItem value='unselected'>unselected</MenuItem>
                                {possibleTutors.map(tutor => {
                                    return (
                                        <MenuItem key={tutor.id} value={tutor}>
                                            {`${tutor.lastName} ${tutor.firstName}`}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <Tooltip
                            title='Replace tutor'
                            classes={{tooltip: classes.tooltip}}
                            placement='top'
                            arrow
                            TransitionComponent={Fade}
                            enterDelay={1000}
                        >
                            <span className={(request.updating || request.geting) ? classes.progress : ''}>
                                <IconButton
                                    size='small'
                                    disabled={!isPossible || request.updating}
                                    className={classes.replaceButton}
                                    onClick={replaceTutorHandling}
                                >
                                    <DoneIcon fontSize='small'/>
                                </IconButton>
                            </span>
                        </Tooltip>
                    </div>

                </Grid>
                <Grid item lg={2} className={classes.second}>
                    <Tooltip
                        title={isStudentsMode ? 'OFF students list change mode' : 'ON students list change mode'}
                        classes={{tooltip: classes.tooltip}}
                        placement='left'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={(request.updating || request.geting) ? classes.progress : ''}>
                            <Button
                                variant='outlined'
                                disabled={request.updating || request.geting}
                                className={clsx(classes.buttons, isStudentsMode && classes.buttonsActive)}
                                onClick={() => {
                                    setIsStudentsMode(!isStudentsMode);
                                    setIsTeachersMode(false);
                                    setFilteredStudents('');
                                }}
                            >
                                <SwapHorizIcon/>
                                <SchoolIcon/>
                            </Button>
                        </span>
                    </Tooltip>
                    <Tooltip
                        title={isTeachersMode ? 'OFF class teachers list change mode' :
                            'ON class teachers list change mode'}
                        classes={{tooltip: classes.tooltip}}
                        placement='left'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={request.updating ? classes.progress : ''}>
                             <Button
                                 variant='outlined'
                                 disabled={request.updating || request.geting}
                                 className={clsx(classes.buttons, isTeachersMode && classes.buttonsActive)}
                                 onClick={() => {
                                     setIsTeachersMode(!isTeachersMode);
                                     setIsStudentsMode(false);
                                     setSelectedSubject('all');
                                 }}
                             >
                                <SwapHorizIcon/>
                                <SupervisedUserCircleIcon/>
                            </Button>
                        </span>
                    </Tooltip>
                </Grid>
                <Grid item lg={5}>
                    <Grid container>
                        <Grid item lg={9} component='span'>
                            <Zoom in={isStudentsMode}>
                                <TextField
                                    hidden={!isStudentsMode}
                                    size='small'
                                    label='search student'
                                    type='search'
                                    id='search-student'
                                    variant='outlined'
                                    value={filteredStudents}
                                    onChange={handleFilteredStudents}
                                />
                            </Zoom>
                            <Zoom in={isTeachersMode}>
                                <FormControl className={classes.selectInput} hidden={!isTeachersMode}>
                                    <InputLabel id='select-subject'>
                                        sort by subject
                                    </InputLabel>
                                    <Select
                                        labelId='select-subject'
                                        value={selectedSubject}
                                        onChange={handleSelectedSubject}
                                    >
                                        <MenuItem value='all'>all</MenuItem>
                                        {subjects.map((subject, i) => {
                                            return <MenuItem key={i} value={subject}>{subject}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Zoom>
                        </Grid>
                        <Grid item lg={3} component='span' style={{display: 'flex', justifyContent: 'center'}}>
                            <Tooltip
                                title='Confirm new list content'
                                classes={{tooltip: classes.tooltip}}
                                placement='top-end'
                                arrow
                                TransitionComponent={Fade}
                                enterDelay={1000}
                            >
                            <span className={request.updating ? classes.progress : ''}>
                                <IconButton
                                    disabled={!isChanging}
                                    className={classes.buttonsActive}
                                    onClick={confirmUpdate}
                                >
                                    <DoneIcon/>
                                </IconButton>
                            </span>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
};

NavClassPanel.propTypes = {
    request: PropTypes.object.isRequired,
    tutor: PropTypes.object.isRequired,
    possibleTutors: PropTypes.array.isRequired,
    getModeStatus: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
    getSelectedSubject: PropTypes.func.isRequired,
    getFilteredStudents: PropTypes.func.isRequired,
    isChanging: PropTypes.bool.isRequired,
    classId: PropTypes.string.isRequired,
    updateTutor: PropTypes.func.isRequired,
    confirmUpdate: PropTypes.func.isRequired,
    getIsTutor: PropTypes.func.isRequired
};

export default NavClassPanel;
