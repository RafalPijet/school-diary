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
import Spinner from "../../common/Spinner/Spinner";
import NavClassPanel from "../NavClassPanel/NavClassPanelContainer";
import componentStyle from "./ClassContentStyle";
import {sortByLastnameFromAToZ} from "../../../utilities/functions";

const useStyles = makeStyles(theme => componentStyle(theme));

const not = (a, b) => {
    return a.filter(value => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
    return a.filter(value => b.indexOf(value) !== -1);
};

const ClassContent = props => {
    const {
        classItem,
        request,
        teachers,
        possibleTutors,
        freeStudents,
        availableSubjects,
        updateClass,
        studentMode
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
    const [isChanging, setIsChanging] = useState(false);
    const [subjectDuplicates, setSubjectDuplicates] = useState([]);
    const [isTutor, setIsTutor] = useState(false);
    const classes = useStyles();

    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index);

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
            setIsTutor(false);
        } else if (!isStudentMode && isTeacherMode) {
            setRightList(freeTeachers);
            setLeftList(classItem.subjectTeachers);
            setIsTypeStudent(false);
            setIsTypeTeacher(false);
            setRightDesc('available teachers');
            setLeftDesc('class teachers');
            setIsTutor(false);
        } else {
            setRightList(classItem.subjectTeachers);
            setLeftList(classItem.students);
            setIsTypeTeacher(false);
            setIsTypeStudent(true);
            setRightDesc('class teachers');
            setLeftDesc('students');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStudentMode, isTeacherMode, isVisible, isShowButtons,
        teachers, classItem.students, classItem.subjectTeachers]);

    useEffect(() => {

        if (isStudentMode || isTeacherMode) {
            let first = isStudentMode ? classItem.students.map(student => student.id) :
                classItem.subjectTeachers.map(teacher => teacher.id);
            let second = leftList.map(item => item.id);
            let result = first.length !== second.length;

            if (first.length === second.length) {
                let counter = 0;
                first.forEach(item => {

                    if (second.includes(item)) counter++;
                });
                result = (counter !== first.length);
            }
            setIsChanging(result);
        } else {
            setIsChanging(false);
        }

        if (isTeacherMode) {
            let subjects = leftList.map(item => item.subject);
            setSubjectDuplicates(findDuplicates(subjects));
            if (findDuplicates(subjects).length > 0) setIsChanging(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leftList]);

    const leftChecked = intersection(checked, leftList);
    const rightChecked = intersection(checked, rightList);

    const confirmUpdate = async () => {
        await studentMode(isStudentMode);
        updateClass({
            id: classItem.id,
            isStudents: isStudentMode,
            [isStudentMode ? 'students' : 'subjectTeachers']: leftList
        });
    };

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

    const rowItem = (i, value, isStudent, duplicates) => {
        const {lastName, firstName, birthDate, subject} = value;

        return (
            <span style={{whiteSpace: 'nowrap'}}>
                <Typography display='inline' component='p' color='textSecondary'>{`${i + 1}. `}</Typography>
                <Typography display='inline' variant='h6' color='textPrimary'>{`${lastName} ${firstName}`}</Typography>
                {isStudent ?
                    <Typography display='inline' component='p' color='textSecondary'>
                        {` d.o.b.: ${birthDate.substring(0, 10)}`}
                    </Typography> :
                    <Typography
                        display='inline'
                        component='p'
                        color='textSecondary'
                        className={duplicates.includes(subject) ? classes.duplicate : ''}
                    >
                        {` - ${subject}`}
                    </Typography>
                }
            </span>
        )
    };

    const customList = (items, isStudent) => (
        <Paper
            className={clsx(classes.paper, !isVisible && classes.moreWidth, request.updating && !isTutor && classes.spinner)}>
            {(request.updating) && !isTutor ? <Spinner/> :
                <List dense component="div" role="list">
                    {items.map((value, i) => {
                        const labelId = `transfer-list-item-${value}-label`;

                        return (
                            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                                <ListItemText
                                    id={labelId}
                                    style={{margin: 0}}
                                    primary={rowItem(i, value, isStudent, subjectDuplicates)}
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
            }
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="space-between" alignItems="center" className={classes.root}>
            <Grid item>
                {customList(leftList.sort(sortByLastnameFromAToZ), isTypeStudent)}
                <Typography className={classes.description} variant='subtitle2'>
                    {`${leftDesc}: ${request.updating ? '...' : leftList.length}`}
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
                {customList(rightList.sort(sortByLastnameFromAToZ), isTypeTeacher)}
                <Typography className={classes.description} variant='subtitle2'>
                    {`${rightDesc}: ${request.updating ? '...' : rightList.length}`}
                </Typography>
            </Grid>
            <NavClassPanel
                classId={classItem.id}
                tutor={classItem.mainTeacher}
                possibleTutors={possibleTutors}
                getModeStatus={getModeStatus}
                subjects={subjects}
                getSelectedSubject={setSelectedSubject}
                getFilteredStudents={setFilteredStudents}
                isChanging={isChanging}
                confirmUpdate={confirmUpdate}
                getIsTutor={isTutor => setIsTutor(isTutor)}
            />
        </Grid>
    )
};

ClassContent.propTypes = {
    classItem: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    teachers: PropTypes.array.isRequired,
    possibleTutors: PropTypes.array.isRequired,
    freeStudents: PropTypes.array.isRequired,
    availableSubjects: PropTypes.object.isRequired,
    updateClass: PropTypes.func.isRequired,
    studentMode: PropTypes.func.isRequired
};

export default ClassContent
