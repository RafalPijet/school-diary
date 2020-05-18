import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, Tabs, Tab, Paper, Typography} from "@material-ui/core";
import {Zoom, Fade} from "@material-ui/core";
import Spinner from "../../common/Spinner/Spinner";
import componentStyle from "./ClassesContentStyle";
import {a11yProps, sortByNameFromAToZ} from "../../../utilities/functions";
import ClassContent from "../ClassContent/ClassContentContainer";

const useStyles = makeStyles(theme => componentStyle(theme));

const ClassesContent = props => {
    const {allClasses, classGrade, allStudents, loadAllStudents, possibleTutors, request, getStudentsById} = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [newValue, setNewValue] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [filteredClass, setFilteredClass] = useState(allClasses);
    const [classGradeIn, setClassGradeIn] = useState('none');

    useEffect(() => {

        if (classGrade !== 'none') {
            setFilteredClass(allClasses.filter(classItem => classItem.name.includes(classGrade)));
            setClassGradeIn(classGrade);
        } else {
            setFilteredClass(allClasses.sort(sortByNameFromAToZ));
            setClassGradeIn(classGrade);
        }

        if (classGrade !== classGradeIn) setValue(0);

        if (allStudents.length === 0) loadAllStudents();

        if (filteredClass.length) setIsShow(true);
        prepareFreeStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allStudents, allClasses, classGrade]);

    const prepareFreeStudents = () => {
        let studentsClassId = [];
        let result = [];
        allClasses.forEach(item => {
            let studentsId = item.students.map(student => student.id);
            studentsId.forEach(id => studentsClassId.push(id));
        });
        allStudents.forEach(id => {

            if (!studentsClassId.includes(id)) result.push(id)
        });

        if (result.length) {
            getStudentsById(result);
            // console.log(result);
        }
        // setFreeStudents(result);
    };

    const handleChange = (event, newValue) => {
        setIsShow(false);
        setNewValue(newValue);
    };

    const changeClass = () => {
        setIsShow(true);
        setValue(newValue);
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
                                    <ClassContent
                                        classItem={filteredClass[value]}
                                        possibleTutors={possibleTutors}
                                    />
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
    allStudents: PropTypes.array.isRequired,
    loadAllStudents: PropTypes.func.isRequired,
    possibleTutors: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    getStudentsById: PropTypes.func.isRequired
};

export default ClassesContent;
