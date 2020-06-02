import React, {useState, useEffect} from 'react';
import {Paper, AppBar, Tabs, Tab} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
import StudentForm from "../StudentForm/StudentFormContainer";
import StudentsTable from "../StudentsTable/StudentsTableContainer";
import Alert from "../../common/Alert/Alert";
import {a11yProps} from "../../../utilities/functions";
import componentStyle from "./StudentsHandlingStyle";

const useStyles = makeStyles(theme => componentStyle((theme)));

const StudentsHandling = props => {
    const {
        request,
        resetRequest,
        alertSuccess,
        setAlertSuccess,
        allStudents,
        freeStudents,
        clearAllStudents,
        clearFreeStudents
    } = props;
    const [value, setValue] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const classes = useStyles();

    useEffect(() => {

        if (!allStudents.length && !freeStudents.length && !isReady) {
            setIsReady(true);
        }
    }, [allStudents, freeStudents, isReady]);

    useEffect(() => {
        return () => {
            clearAllStudents([]);
            clearFreeStudents([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAlert = () => {
        alertSuccess.isOpen ? setAlertSuccess(false, '') : resetRequest();
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <>
                <AppBar position='static' className={classes.tabs}>
                    <Tabs value={value} onChange={handleChange} textColor='primary' variant='fullWidth'>
                        <Tab className={classes.tabs} label='students list' icon={<ListIcon/>} {...a11yProps(0)}/>
                        <Tab className={classes.tabs} label='add student'
                             icon={<PersonAddIcon/>} {...a11yProps(1)}/>
                    </Tabs>
                </AppBar>
                <Paper className={classes.content} elevation={9}>
                    {value === 0 && isReady && <StudentsTable/>}
                    {value === 1 && <StudentForm/>}
                </Paper>
            </>
            <Alert
                isOpenAlert={alertSuccess.isOpen || request.error !== null}
                variant={alertSuccess.isOpen ? 'success' : 'error'}
                message={alertSuccess.isOpen ? alertSuccess.message : request.error}
                handleCloseHandling={handleAlert}
            />
        </Paper>
    )
};

StudentsHandling.propTypes = {
    resetRequest: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    setAlertSuccess: PropTypes.func.isRequired,
    allStudents: PropTypes.array.isRequired,
    freeStudents: PropTypes.array.isRequired,
    clearAllStudents: PropTypes.func.isRequired,
    clearFreeStudents: PropTypes.func.isRequired
};

export default StudentsHandling;
