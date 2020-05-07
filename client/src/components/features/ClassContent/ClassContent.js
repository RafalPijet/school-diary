import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import clsx from "clsx";
import {makeStyles} from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    List,
    ListItem,
    Typography,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Button,
    Zoom
} from '@material-ui/core';
import NavClassPanel from "../NavClassPanel/NavClassPanelContainer";
import {style} from "../../../styles/global";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: 'auto',
    },
    paper: {
        width: 434,
        height: 270,
        overflow: 'auto',
        transition: '.5s'
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    description: {
        padding: style.smallSize
    },
    moreWidth: {
        width: 474,
        transition: '.5s'
    }
}));

const not = (a, b) => {
    return a.filter(value => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
    return a.filter(value => b.indexOf(value) !== -1);
};

const ClassContent = props => {
    const {
        classItem,
        allStudents,
        request,
        resetRequest,
        teachers,
        possibleTutors,
        freeStudents,
        availableSubjects
    } = props;
    const [checked, setChecked] = useState([]);
    const [leftList, setLeftList] = useState(classItem.students);
    const [rightList, setRightList] = useState(classItem.subjectTeachers);
    const [leftDesc, setLeftDesc] = useState('students');
    const [rightDesc, setRightDesc] = useState('class teachers');
    const [isVisible, setIsVisible] = useState(false);
    const [isShowButtons, setIsShowButtons] = useState(false);
    const [isStudentMode, setIsStudentMode] = useState(false);
    const [isTeacherMode, setIsTeacherMode] = useState(false);
    const [isTypeStudent, setIsTypeStudent] = useState(true);
    const [isTypeTeacher, setIsTypeTeacher] = useState(false);
    const [freeTeachers, setFreeTeachers] = useState([]);
    const [subjects,] = useState(availableSubjects[`class${classItem.name.substring(6, 7)}`]);
    const classes = useStyles();

    useEffect(() => {
        prepareFreeTeachers();
        setIsVisible(isStudentMode || isTeacherMode);

        if (isVisible) {
            setTimeout(() => setIsShowButtons(true), 500);
        } else {
            setIsShowButtons(false);
        }

        if (isStudentMode && !isTeacherMode) {
            setRightList(freeStudents);
            setLeftList(classItem.students);
            setIsTypeTeacher(true);
            setIsTypeStudent(true);
            setRightDesc('available students');
            setLeftDesc('students');
        } else if (!isStudentMode && isTeacherMode) {
            setRightList(freeTeachers);
            setLeftList(classItem.subjectTeachers);
            setIsTypeStudent(false);
            setIsTypeTeacher(false);
            setRightDesc('available teachers');
            setLeftDesc('class teachers');
        } else {
            setRightList(classItem.subjectTeachers);
            setLeftList(classItem.students);
            setIsTypeTeacher(false);
            setIsTypeStudent(true);
            setRightDesc('class teachers');
            setLeftDesc('students');
        }
    }, [isStudentMode, isTeacherMode, isVisible, isShowButtons, teachers]);

    const leftChecked = intersection(checked, leftList);
    const rightChecked = intersection(checked, rightList);

    const setSelectedSubject = subject => {
        subject !== 'all' ?
            setRightList(freeTeachers.filter(item => item.subject === subject)) : setRightList(freeTeachers);
    };

    const setFilteredStudents = data => {
        setRightList(freeStudents.filter(item => (item.lastName.toLowerCase().includes(data.toLowerCase()) ||
            item.firstName.toLowerCase().includes(data.toLowerCase()))));
    };

    const prepareFreeTeachers = () => {
        let result = [];
        let teachersClassId = classItem.subjectTeachers.map(teacher => teacher.id);
        teachers.forEach(item => {

            if (!teachersClassId.includes(item.id)) result = [...result, item]
        });
        setFreeTeachers(result);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const getModeStatus = (isStudentMode, isTeacherMode) => {
        setIsStudentMode(isStudentMode);
        setIsTeacherMode(isTeacherMode);
    };

    const handleCheckedRight = () => {
        setRightList(rightList.concat(leftChecked));
        setLeftList(not(leftList, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeftList(leftList.concat(rightChecked));
        setRightList(not(rightList, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (items, isStudent) => (
        <Paper className={clsx(classes.paper, !isVisible && classes.moreWidth)}>
            <List dense component="div" role="list">
                {items.map((value, i) => {
                    const labelId = `transfer-list-item-${value}-label`;
                    const {id, lastName, firstName, birthDate, subject} = value;
                    return (
                        <ListItem key={id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemText
                                id={labelId}
                                primary={`${i + 1}. ${lastName} ${firstName} ${isStudent ? birthDate.substring(0, 10) : subject}`}
                            />
                            <ListItemIcon style={{justifyContent: "flex-end"}}>
                                <Checkbox
                                    hidden={!isShowButtons}
                                    style={{padding: 0}}
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="space-between" alignItems="center" className={classes.root}>
            <Grid item>
                {customList(leftList, isTypeStudent)}
                <Typography className={classes.description} variant='subtitle2'>
                    {`${leftDesc}: ${leftList.length}`}
                </Typography>
            </Grid>
            <Zoom in={isShowButtons}>
                <Grid item hidden={!isShowButtons}>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedRight}
                            disabled={leftChecked.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.button}
                            onClick={handleCheckedLeft}
                            disabled={rightChecked.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                        </Button>
                    </Grid>
                </Grid>
            </Zoom>
            <Grid item>
                {customList(rightList, isTypeTeacher)}
                <Typography className={classes.description} variant='subtitle2'>
                    {`${rightDesc}: ${rightList.length}`}
                </Typography>
            </Grid>
            <NavClassPanel
                tutor={classItem.mainTeacher}
                possibleTutors={possibleTutors}
                getModeStatus={getModeStatus}
                subjects={subjects}
                getSelectedSubject={setSelectedSubject}
                getFilteredStudents={setFilteredStudents}
            />
        </Grid>
    )
};

ClassContent.propTypes = {
    classItem: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    teachers: PropTypes.array.isRequired,
    resetRequest: PropTypes.func.isRequired,
    allStudents: PropTypes.array.isRequired,
    possibleTutors: PropTypes.array.isRequired,
    freeStudents: PropTypes.array.isRequired,
    availableSubjects: PropTypes.object.isRequired
};

export default ClassContent
