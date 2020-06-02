import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from "../../common/Spinner/Spinner";
import {Paper, Typography, Grid, Tooltip, IconButton, Fade, TextField} from "@material-ui/core";
import Parents from '@material-ui/icons/Wc';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import componentStyle from "./StudentItemStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const StudentItem = props => {
    const {
        request,
        setModalYesNot,
        student,
        updateStudent,
        getStudentIdUpdated,
        studentIdUpdated,
        maxBirthDate
    } = props;
    const [data, setData] = useState({
        firstName: student.firstName,
        lastName: student.lastName,
        birthDate: student.birthDate
    });
    const [isEdit, setIsEdit] = useState(false);
    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDateError, setIsDateError] = useState(false);
    const classes = useStyles();

    useEffect(() => {

        if (!isEdit && !request.adding) {
            setData({
                firstName: student.firstName,
                lastName: student.lastName,
                birthDate: student.birthDate
            });
            getStudentIdUpdated('');
        }
        setIsDateError(new Date(data.birthDate) >= new Date(maxBirthDate));
        setIsShowConfirm(student.firstName !== data.firstName ||
            student.lastName !== data.lastName ||
            student.birthDate !== data.birthDate);
        setIsUpdating(studentIdUpdated === student.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.firstName, data.lastName, data.birthDate, studentIdUpdated, request.adding]);

    const handleEdit = () => {
        setIsEdit(!isEdit);

        if (isShowConfirm) {
            setData({
                firstName: student.firstName,
                lastName: student.lastName,
                birthDate: student.birthDate
            })
        }
    };

    const handleChange = event => {
        setData({...data, [event.target.name]: event.target.value});
    };

    const handleRemove = () => {
        setModalYesNot(true, {
            description: `Do you want remove student ${data.lastName} ${data.firstName}?`,
            data: {studentId: student.id}
        })
    };

    const handleUpdate = () => {
        setIsShowConfirm(false);
        setIsEdit(false);
        let studentsAfterChange = {
            id: student.id,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            className: student.className,
            parents: student.parents
        };
        updateStudent(studentsAfterChange);
        getStudentIdUpdated(student.id);
    };

    return (
        <Paper className={clsx(classes.root, isEdit && classes.item)} variant='outlined'>
            <Grid container>
                <Grid item lg={6} className={classes.names}>
                    {((isUpdating && data.firstName !== student.firstName) ||
                        (isUpdating && data.lastName !== student.lastName)) ?
                        <Spinner/>
                        :
                        <>
                            <Typography hidden={isEdit} style={{fontWeight: '700'}}
                                        display='inline'>{`${data.lastName} ${data.firstName}`}</Typography>
                            < TextField
                                name='lastName'
                                value={data.lastName}
                                hidden={!isEdit}
                                label='Last name'
                                size='small'
                                onChange={handleChange}
                                error={!data.lastName.length}
                            />
                            <TextField
                                name='firstName'
                                value={data.firstName}
                                hidden={!isEdit}
                                label='First name'
                                size='small'
                                onChange={handleChange}
                                error={!data.firstName.length}
                            />
                        </>
                    }
                </Grid>
                <Grid item lg={2} className={clsx(classes.names, classes.justifyCenter)}>
                    {isUpdating && data.birthDate !== student.birthDate ? <Spinner/> :
                        <>
                            <Typography hidden={isEdit} display='inline'>{data.birthDate.substring(0, 10)}</Typography>
                            <TextField
                                name='birthDate'
                                value={data.birthDate.substring(0, 10)}
                                hidden={!isEdit}
                                type='date'
                                size='small'
                                onChange={handleChange}
                                error={isDateError}
                            />
                        </>
                    }
                </Grid>
                <Grid item lg={2} className={clsx(classes.names, classes.justifyCenter)}>
                    <Typography display='inline'>{student.className}</Typography>
                </Grid>
                <Grid item lg={2} className={classes.buttons}>
                    <Tooltip
                        title='Parents'
                        placement='top'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={(request.updating || request.adding) && classes.progress}>
                            <IconButton
                                disabled={!student.parents.length || request.updating || request.adding}
                                className={classes.button}
                            >
                                <Parents fontSize='small'/>
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip
                        title={`${isEdit ? 'Close edit mode' : 'Open edit mode'}`}
                        placement='top'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={(request.updating || request.adding) && classes.progress}>
                            <IconButton
                                className={clsx(classes.button, isEdit ? classes.close : classes.edit)}
                                disabled={request.updating || request.adding}
                                onClick={handleEdit}
                            >
                                {isEdit ? <CloseIcon fontSize='small'/> : <EditIcon fontSize='small'/>}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip
                        title={isShowConfirm ? 'Confirm updating' : 'Remove student'}
                        placement='top'
                        arrow
                        TransitionComponent={Fade}
                        enterDelay={1000}
                    >
                        <span className={(request.updating || request.adding) && classes.progress}>
                            <IconButton
                                className={clsx(classes.button, isShowConfirm ? classes.edit : classes.delete)}
                                disabled={request.updating || request.adding || isDateError ||
                                !data.firstName.length || !data.lastName.length}
                                onClick={(isEdit && isShowConfirm) ? handleUpdate : handleRemove}
                            >
                                {isShowConfirm ? <DoneIcon fontSize='small'/> : <DeleteIcon fontSize='small'/>}
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    )
};

StudentItem.propTypes = {
    student: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    setModalYesNot: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    studentIdUpdated: PropTypes.string,
    getStudentIdUpdated: PropTypes.func.isRequired,
    maxBirthDate: PropTypes.string.isRequired
};

export default StudentItem;
