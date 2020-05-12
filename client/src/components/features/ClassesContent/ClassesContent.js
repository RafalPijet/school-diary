import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {AppBar, Tabs, Tab, Paper, Typography} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import TabPanelClass from "../../common/TabPanelClass/TabPanelClass";
import componentStyle from "./ClassesContentStyle";
import {sortByNameFromAToZ} from "../../../utilities/functions";

const useStyles = makeStyles(theme => componentStyle(theme));

const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const ClassesContent = props => {
    const {allClasses, classGrade, allStudents, loadAllStudents, possibleTutors} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [freeStudents, setFreeStudents] = useState([]);
    const [filteredClass, setFilteredClass] = useState(allClasses);

    useEffect(() => {

        if (classGrade !== 'none') {
            setFilteredClass(allClasses.filter(classItem => classItem.name.includes(classGrade)));
        } else {
            // console.log(allClasses.sort(sortByNameFromAToZ));
            setFilteredClass(allClasses.sort(sortByNameFromAToZ));
        }

        if (allStudents.length === 0) loadAllStudents();
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
        allStudents.forEach(student => {

            if (!studentsClassId.includes(student.id)) result.push(student)
        });
        setFreeStudents(result);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Paper elevation={3} className={clsx(classes.root, !filteredClass.length && classes.nothing)}>
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
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                        style={{width: '100%'}}
                    >
                        {filteredClass.map((item, i) => {
                            return <TabPanelClass
                                freeStudents={freeStudents}
                                possibleTutors={possibleTutors}
                                item={item}
                                key={item.id}
                                index={i}
                                value={value}
                                dir={theme.direction}
                            />
                        })}
                    </SwipeableViews>
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
    possibleTutors: PropTypes.array.isRequired
};

export default ClassesContent;
