import React, {useState, useEffect} from 'react';
import {Paper, AppBar, Tabs, Tab} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Spinner from "../../common/Spinner/Spinner";
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
        loadAllStudents,
        alertSuccess,
        setAlertSuccess,
        loadStudentsWithRange
    } = props;
    const [value, setValue] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        resetRequest();
        loadAllStudents();
        loadStudentsWithRange(1, 5);
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
            {request.pending && <Spinner/>}
            {request.success &&
            <>
                <AppBar position='static' className={classes.tabs}>
                    <Tabs value={value} onChange={handleChange} textColor='primary' variant='fullWidth'>
                        <Tab className={classes.tabs} label='students list' icon={<ListIcon/>} {...a11yProps(0)}/>
                        <Tab className={classes.tabs} label='add student'
                             icon={<PersonAddIcon/>} {...a11yProps(1)}/>
                    </Tabs>
                </AppBar>
                <Paper className={classes.content} elevation={9}>
                    {value === 0 && <StudentsTable/>}
                    {value === 1 && <StudentForm/>}
                </Paper>
            </>
            }
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
    loadAllStudents: PropTypes.func.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    setAlertSuccess: PropTypes.func.isRequired,
    loadStudentsWithRange: PropTypes.func.isRequired
};

export default StudentsHandling;
