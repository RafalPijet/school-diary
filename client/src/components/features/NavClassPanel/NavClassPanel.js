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
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        margin: '7px',
        backgroundColor: theme.palette.secondary.dark
    },
    buttons: {
        outline: 'none !important',
        color: theme.palette.primary.main
    },
    second: {
        display: 'flex',
        height: '95px',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    selectTutor: {
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    selectInput: {
        width: '250px'
    },
    replaceButton: {
        outline: 'none !important',
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {backgroundColor: theme.palette.action.dark}
    },
    tooltip: {
        backgroundColor: theme.palette.secondary.light
    },
    buttonsActive: {
        backgroundColor: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.action.dark
        }
    },
    searchField: {
        padding: '5px'
    }
}));

const NavClassPanel = props => {
    const {
        request,
        tutor,
        possibleTutors,
        getModeStatus, subjects,
        getSelectedSubject,
        getFilteredStudents,
        isChanging
    } = props;
    const classes = useStyles();
    const [newTutor, setNewTutor] = useState('unselected');
    const [isPossible, setIsPossible] = useState(false);
    const [isStudentsMode, setIsStudentsMode] = useState(false);
    const [isTeachersMode, setIsTeachersMode] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [filteredStudents, setFilteredStudents] = useState('');

    useEffect(() => {
        setIsPossible(newTutor !== 'unselected');
        getModeStatus(isStudentsMode, isTeachersMode);
    }, [newTutor, isStudentsMode, isTeachersMode]);

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
        console.log('replace');
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item lg={5}>
                    <Typography variant='subtitle1' align='center'>
                        {`tutor: ${tutor.lastName} ${tutor.firstName}`}
                    </Typography>
                    <div className={classes.selectTutor}>
                        <FormControl className={classes.selectInput}>
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
                            <span>
                                <IconButton
                                    size='small'
                                    disabled={!isPossible}
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
                        <span>
                            <Button
                                variant='outlined'
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
                        <span>
                             <Button
                                 variant='outlined'
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
                            <span>
                                <IconButton
                                    disabled={!isChanging}
                                    className={classes.buttonsActive}
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
    isChanging: PropTypes.bool.isRequired
};

export default NavClassPanel;
