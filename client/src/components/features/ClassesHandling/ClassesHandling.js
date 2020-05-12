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
    const {request, loadAllClasses, resetRequest, alertSuccess, setAlertSuccess} = props;
    const [classGrade, setClassGrade] = useState('none');
    const [possibleTutors, setPossibleTutors] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        resetRequest();
        loadAllClasses();
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
            {(request.pending || request.working) && <Spinner/>}
            {request.success &&
            <>
                <ClassesPanel getPossibleTutors={getPossibleTutors} getClassGrade={getClassGrade}/>
                <ClassesContent possibleTutors={possibleTutors} classGrade={classGrade}/>
            </>
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
    resetRequest: PropTypes.func.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    setAlertSuccess: PropTypes.func.isRequired
};

export default ClassesHandling;
