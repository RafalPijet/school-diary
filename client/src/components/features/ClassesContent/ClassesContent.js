import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Tabs, Tab, Paper, Typography} from "@material-ui/core";
import {Zoom} from "@material-ui/core";
import Spinner from "../../common/Spinner/Spinner";
import componentStyle from "./ClassesContentStyle";
import {a11yProps, sortByNameFromAToZ} from "../../../utilities/functions";
import ClassContent from "../ClassContent/ClassContentContainer";

const useStyles = makeStyles(theme => componentStyle(theme));

const ClassesContent = props => {
    const {
        allClasses,
        classGrade,
        allStudents,
        possibleTutors,
        request,
        getStudentsById,
        classesStudents,
        setFreeStudents,
        isStudentMode,
        setIsStudentMode,
        setSelectedClass,
        selectedClass,
        loadDataForClass,
        teachers
    } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [newValue, setNewValue] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [isPrepare, setIsPrepare] = useState(false);
    const [filteredClass, setFilteredClass] = useState(allClasses);
    const [classGradeIn, setClassGradeIn] = useState('none');

    useEffect(() => {

        if (classGrade !== classGradeIn) {
            setValue(0);
            setFilteredClass(allClasses.filter(classItem => classItem.name.includes(classGrade)));
            setClassGradeIn(classGrade);
            setIsPrepare(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classGrade]);

    useEffect(() => {

        if (classesStudents.length && isStudentMode) prepareFreeStudents();

        if (classGrade !== 'none') {
            setFilteredClass(allClasses.filter(classItem => classItem.name.includes(classGrade)));
            setClassGradeIn(classGrade);
        } else {
            setFilteredClass(allClasses.sort(sortByNameFromAToZ));
            setClassGradeIn(classGrade);
        }

        if (filteredClass.length && !isPrepare && teachers.length) prepareContentClass();
        setIsShow(Object.entries(selectedClass).length > 0 && isPrepare);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allClasses, classGrade, filteredClass.length, teachers.length, selectedClass, classGradeIn]);

    const prepareContentClass = () => {
        setIsPrepare(true);
        let classItem = filteredClass[value];
        classItem.mainTeacher = teachers.find(teacher => (teacher.id === classItem.mainTeacher.id));
        setSelectedClass(classItem);
        loadDataForClass(classItem.id);
    };

    const prepareFreeStudents = () => {
        setIsStudentMode(false);
        let result = [];
        allStudents.forEach(id => {

            if (!classesStudents.includes(id)) result.push(id)
        });
        result.length ? getStudentsById(result) : setFreeStudents([]);
    };

    const handleChange = (event, newValue) => {
        setIsShow(false);
        setNewValue(newValue);
    };

    const changeClass = async () => {
        await setIsPrepare(false);
        await setValue(newValue);
        await setSelectedClass({});
        loadDataForClass(filteredClass[newValue].id);
    };

    return (
        <Paper
            elevation={3}
            className={clsx(classes.root, !filteredClass.length && classes.nothing)}>
            {filteredClass.length ?
                <>
                    <AppBar position='static' className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor='secondary'
                            variant='scrollable'
                            scrollButtons='auto'
                        >
                            {filteredClass.map((item, i) => {
                                return <Tab className={classes.tabs} key={item.id} disabled={request.geting}
                                           label={item.name}  {...a11yProps(i)}/>
                            })}
                        </Tabs>
                    </AppBar>
                    <Paper className={classes.content}>
                        {request.geting ? <Spinner style={{marginLeft: '92px', marginTop: '55px'}}/> :
                            <Zoom
                                in={isShow}
                                timeout={500}
                                onExited={changeClass}
                            >
                                <Paper elevation={4} style={{width: '100%'}}>
                                    {((Object.entries(selectedClass).length > 0)) &&
                                    <ClassContent
                                        classItem={selectedClass}
                                        possibleTutors={possibleTutors}
                                    />}
                                </Paper>
                            </Zoom>
                        }
                    </Paper>
                </> : <Typography variant='h6'>Nothing to show...</Typography>
            }
        </Paper>
    )
};

ClassesContent.propTypes = {
    allClasses: PropTypes.arrayOf(PropTypes.shape({
        students: PropTypes.array.isRequired,
        subjectTeachers: PropTypes.array.isRequired,
        id: PropTypes.string.isRequired,
        _id: PropTypes.string,
        name: PropTypes.string.isRequired
    })),
    classGrade: PropTypes.string.isRequired,
    classesStudents: PropTypes.array.isRequired,
    allStudents: PropTypes.array.isRequired,
    possibleTutors: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    getStudentsById: PropTypes.func.isRequired,
    setFreeStudents: PropTypes.func.isRequired,
    isStudentMode: PropTypes.bool.isRequired,
    setIsStudentMode: PropTypes.func.isRequired,
    setSelectedClass: PropTypes.func.isRequired,
    selectedClass: PropTypes.object.isRequired,
    loadDataForClass: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired
};

export default ClassesContent;
