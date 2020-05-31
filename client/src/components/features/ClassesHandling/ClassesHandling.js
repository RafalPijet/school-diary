import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";
import Spinner from "../../common/Spinner/Spinner";
import ClassesPanel from "../ClassesPanel/ClassesPanelContainer";
import ClassesContent from "../ClassesContent/ClassesContentContainer";
import Alert from "../../common/Alert/Alert";
import componentStyle from "./ClassesHandlingStyle";

const useStyles = makeStyles(theme => componentStyle(theme));


const ClassesHandling = props => {
    const {
        request,
        loadAllClasses,
        loadAllStudents,
        loadStudentsIdFromClasses,
        resetRequest,
        alertSuccess,
        setAlertSuccess,
        clearAllClasses,
        clearAllStudents,
        clearFreeStudents,
        clearClassesStudents,
        clearSelectedClass,
        clearTeachers,
        allClasses,
        setIsStudentMode,
        setTutorIsUse
    } = props;
    const [classGrade, setClassGrade] = useState('none');
    const [possibleTutors, setPossibleTutors] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        resetRequest();
        loadAllClasses();
        loadAllStudents();
        loadStudentsIdFromClasses();

        return () => {
            clearAllClasses([]);
            clearAllStudents([]);
            clearFreeStudents([]);
            clearClassesStudents([]);
            clearSelectedClass({});
            clearTeachers([]);
            setIsStudentMode(true);
            setTutorIsUse(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleError = () => {
        resetRequest();
        loadAllClasses();
    };

    const getClassGrade = classGrade => {
        setClassGrade(classGrade);
    };

    const getPossibleTutors = possibleTutors => {
        setPossibleTutors(possibleTutors);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            {request.pending && <Spinner/>}
            {(request.success && allClasses.length) ?
            <>
                <ClassesPanel getPossibleTutors={getPossibleTutors} getClassGrade={getClassGrade}/>
                <ClassesContent possibleTutors={possibleTutors} classGrade={classGrade}/>
            </> : <></>
            }
            {request.error &&
            <Alert
                isOpenAlert={request.error !== null}
                variant='error'
                handleCloseHandling={handleError}
                message={request.error}
            />
            }
            {alertSuccess.isOpen &&
            <Alert
                isOpenAlert={alertSuccess.isOpen}
                variant='success'
                handleCloseHandling={() => setAlertSuccess(false, '')}
                message={alertSuccess.message}
            />}
        </Paper>
    )
};

ClassesHandling.propTypes = {
    request: PropTypes.object.isRequired,
    loadAllClasses: PropTypes.func.isRequired,
    loadAllStudents: PropTypes.func.isRequired,
    loadStudentsIdFromClasses: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    setAlertSuccess: PropTypes.func.isRequired,
    clearAllClasses: PropTypes.func.isRequired,
    clearAllStudents: PropTypes.func.isRequired,
    clearFreeStudents: PropTypes.func.isRequired,
    clearClassesStudents: PropTypes.func.isRequired,
    clearSelectedClass: PropTypes.func.isRequired,
    clearTeachers: PropTypes.func.isRequired,
    allClasses: PropTypes.array.isRequired,
    setIsStudentMode: PropTypes.func.isRequired,
    setTutorIsUse: PropTypes.func.isRequired
};

export default ClassesHandling;
