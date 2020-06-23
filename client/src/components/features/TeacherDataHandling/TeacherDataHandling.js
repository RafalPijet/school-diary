import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types'
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Tabs, Tab, AppBar} from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import {a11yProps} from "../../../utilities/functions";
import Spinner from "../../common/Spinner/Spinner";
import Alert from "../../common/Alert/Alert";
import EditUserData from "../../common/EditUserData/EditUserDataContainer";
import TeacherDataStudents from "../TeacherDataStudents/TeachersDataStudentsContainer";
import componentStyle from "./TeacherDataHandlingStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeacherDataHandling = props => {
    const {
        request,
        resetRequest,
        alertSuccess,
        setAlertSuccess,
        teacherAllClass,
        loadAllClasses,
        userId
    } = props;
    const [value, setValue] = useState(0);
    const classes = useStyles();

    useEffect(() => {

        if (!teacherAllClass.length) loadAllClasses(userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherAllClass.length]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const alertHandling = () => {

        if (request.error !== null) resetRequest();

        if (alertSuccess.isOpen) setAlertSuccess(false, '');
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            {request.pending ? <Spinner/> :
                <>
                    <AppBar position='static' className={classes.tabs}>
                        <Tabs value={value} onChange={handleChange} textColor='primary' variant='fullWidth'>
                            <Tab label='students list' icon={<ListIcon/>} {...a11yProps(0)}/>
                            <Tab label="edit teacher data" icon={<EditIcon/>} {...a11yProps(1)}/>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TeacherDataStudents/>}
                    {value === 1 &&
                    <div className={classes.edit}>
                        <EditUserData/>
                    </div>
                    }
                </>

            }
            <Alert
                isOpenAlert={request.error !== null || alertSuccess.isOpen}
                variant={alertSuccess.isOpen ? 'success' : 'error'}
                message={alertSuccess.isOpen ? alertSuccess.message : request.error}
                handleCloseHandling={alertHandling}
            />
        </Paper>
    )
};

TeacherDataHandling.propTypes = {
    request: PropTypes.object.isRequired,
    resetRequest: PropTypes.func.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    setAlertSuccess: PropTypes.func.isRequired,
    teacherAllClass: PropTypes.array.isRequired,
    loadAllClasses: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default TeacherDataHandling
