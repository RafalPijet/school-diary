import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types'
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Paper, AppBar, Tabs, Tab, Typography, Link} from "@material-ui/core";
import Spinner from "../../common/Spinner/Spinner";
import StudentTeachersItem from "../StudentTeachersItem/StudentTeachersItem";
import {a11yProps} from "../../../utilities/functions";
import componentStyle from "./StudentTeachersListStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const StudentTeachersList = props => {
    const {
        request,
        user,
        getClassesName,
        selectedClass,
        loadTeachers,
        clearSelectedClass
    } = props;
    const [value, setValue] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const classes = useStyles();

    useEffect(() => {

        if (Object.values(user.students).length && !isLoad) {
            let studentsId = user.students.map(student => student.id);
            getClassesName(studentsId);
            setIsLoad(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoad]);

    useEffect(() => {

        if (Object.values(user.students).length && !Object.values(selectedClass).length) {

            if (user.students[value].className !== 'none' && !isReady) {
                loadTeachers(user.students[value].className);
                setIsReady(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, selectedClass, isReady]);

    useEffect(() => {
        return () => {
            clearSelectedClass({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        loadTeachers(user.students[newValue].className);
    };

    return (
        <Paper variant='outlined' className={clsx(classes.root, !user.students.length && classes.center)}>
            {user.students.length ?
                <>
                    <AppBar position='static' className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor='primary'
                        >
                            {user.students.length && user.students.map((item, i) => {
                                return <Tab
                                    disabled={request.geting}
                                    className={classes.tabs}
                                    key={item.id}
                                    label={`${item.firstName} ${item.lastName}`}
                                    {...a11yProps(i)}/>
                            })}
                        </Tabs>
                    </AppBar>
                    <Paper elevation={3} className={clsx(classes.content,
                        request.geting || !Object.values(selectedClass).length ? classes.center : '')}>
                        {request.geting || !Object.values(selectedClass).length ? <Spinner/> :
                            <StudentTeachersItem classItem={selectedClass}/>
                        }
                    </Paper>
                </> :
                <>
                    <Typography style={{fontSize: '20px'}}>
                        {`The parent ${user.lastName} ${user.firstName} has no any student assigned.`}
                    </Typography>
                    <Typography>Contact the principal:</Typography>
                    <Link className={classes.email} href={'mailto:principal@gmail.com'}>principal@gmail.com</Link>
                </>
            }
        </Paper>
    )
};

StudentTeachersList.propTypes = {
    request: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getClassesName: PropTypes.func.isRequired,
    selectedClass: PropTypes.object.isRequired,
    loadTeachers: PropTypes.func.isRequired,
    clearSelectedClass: PropTypes.func.isRequired
};

export default StudentTeachersList;
