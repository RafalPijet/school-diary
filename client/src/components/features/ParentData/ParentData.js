import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Typography, Grid} from "@material-ui/core";
import Alert from "../../common/Alert/Alert";
import Spinner from "../../common/Spinner/Spinner";
import EditUserData from "../../common/EditUserData/EditUserDataContainer";
import componentStyle from './ParentDataStyle';

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentData = props => {
    const {
        request,
        user,
        getClassesName,
        alertSuccess,
        resetRequest,
        setAlertSuccess
    } = props;
    const [isReady, setIsReady] = useState(false);
    const classes = useStyles();

    useEffect(() => {

        if (Object.values(user.students).length && !isReady) {
            let studentsId = user.students.map(student => student.id);
            getClassesName(studentsId);
            setIsReady(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isReady]);

    const handleAlert = () => {

        if (request.error !== null) resetRequest();

        if (alertSuccess.isOpen) setAlertSuccess(false, '');
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <Typography variant='subtitle2'>{`Student${user.students.length > 1 ? 's' : ''}:`}</Typography>
            <Paper variant='outlined' className={clsx(classes.students,
                (request.geting || user.students.length < 3) ? classes.center : '')}>
                {request.geting ? <Spinner/> :
                    user.students.length ? user.students.map(student => {
                        return (
                            <Paper key={student.id} elevation={9} className={classes.item}>
                                <Grid container alignItems='center' justify='center'>
                                    <Grid item lg={6}>
                                        <Typography display='inline' style={{fontWeight: 700}}>
                                            {`${student.lastName} ${student.firstName}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Typography display='inline'>
                                            {student.birthDate.substring(0, 10)}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Typography display='inline'>{student.className}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    }) : <Typography>none</Typography>
                }
            </Paper>
            <Typography variant='subtitle2'>Edit data:</Typography>
            <div className={classes.edit}>
                <EditUserData/>
            </div>
            <Alert
                isOpenAlert={request.error !== null || alertSuccess.isOpen}
                message={alertSuccess.isOpen ? alertSuccess.message : request.error}
                variant={alertSuccess.isOpen ? 'success' : 'error'}
                handleCloseHandling={handleAlert}
            />
        </Paper>
    )
};

ParentData.propTypes = {
    request: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getClassesName: PropTypes.func.isRequired,
    alertSuccess: PropTypes.object.isRequired,
    resetRequest: PropTypes.func.isRequired,
    setAlertSuccess: PropTypes.func.isRequired
};

export default ParentData;
