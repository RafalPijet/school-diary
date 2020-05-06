import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {AppBar, Tabs, Tab, Paper} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import TabPanelClass from "../../common/TabPanelClass/TabPanelClass";
import componentStyle from "./ClassesContentStyle";

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

    useEffect(() => {
        if (allStudents.length === 0) loadAllStudents();
        prepareFreeStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allStudents, allClasses]);

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
        <Paper elevation={3} className={classes.root}>
            <AppBar position='static' className={classes.tabs}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor='secondary'
                    variant='scrollable'
                    scrollButtons='auto'
                >
                    {allClasses.map((item, i) => {
                        return <Tab className={classes.tabs} key={item.id} label={item.name}  {...a11yProps(i)}/>
                    })}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{width: '100%'}}
            >
                {allClasses.map((item, i) => {
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