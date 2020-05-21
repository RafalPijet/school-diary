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
        setSelectedClass,
        selectedClass,
        loadDataForClass
    } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [newValue, setNewValue] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [filteredClass, setFilteredClass] = useState(allClasses);
    const [classGradeIn, setClassGradeIn] = useState('none');

    useEffect(() => {

        if (classesStudents.length && isStudentMode) prepareFreeStudents();

        if (classGrade !== 'none') {
            setFilteredClass(allClasses.filter(classItem => classItem.name.includes(classGrade)));
            setClassGradeIn(classGrade);
        } else {
            setFilteredClass(allClasses.sort(sortByNameFromAToZ));
            setClassGradeIn(classGrade);
        }

        if (classGrade !== classGradeIn) setValue(0);

        if (filteredClass.length && !isShow) prepareContentClass();
        setIsShow(Object.entries(selectedClass).length > 0);
        // if (filteredClass.length) setIsShow(true);

    }, [allClasses, classGrade, filteredClass.length, classesStudents.length, isStudentMode]);

    const prepareContentClass = () => {
        setSelectedClass(filteredClass[value]);
        loadDataForClass(filteredClass[value].id);
    };

    const prepareFreeStudents = () => {

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
        await setValue(newValue);
        await setSelectedClass({});
        loadDataForClass(filteredClass[value].id);
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
                                return <Tab className={classes.tabs} key={item.id}
                                           label={item.name}  {...a11yProps(i)}/>
                            })}
                        </Tabs>
                    </AppBar>
                    <Paper className={classes.content}>
                        {request.working ? <Spinner style={{marginLeft: '92px', marginTop: '55px'}}/> :
                            <Zoom
                                in={isShow}
                                timeout={500}
                                onExited={changeClass}
                            >
                                <Paper elevation={4} style={{width: '100%'}}>
                                    {(Object.entries(selectedClass).length > 0 && !request.geting) &&
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
    setSelectedClass: PropTypes.func.isRequired,
    selectedClass: PropTypes.object.isRequired,
    loadDataForClass: PropTypes.func.isRequired
};

export default ClassesContent;
