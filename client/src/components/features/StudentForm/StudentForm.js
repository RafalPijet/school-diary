import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {TextField, Fab} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import Spinner from "../../common/Spinner/Spinner";
import componentStyle from "./StudentFormStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const StudentForm = props => {
    const {request, addStudent, maxBirthDate, studentsAmount, alertSuccess} = props;
    const [newStudent, setNewStudent] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        ratings: [],
        parents: []
    });
    const [isAccept, setIsAccept] = useState(false);
    const [amount, setAmount] = useState(studentsAmount);
    const classes = useStyles();

    useEffect(() => {
        setIsAccept(newStudent.firstName.length > 0 &&
            newStudent.lastName.length > 0 &&
            newStudent.birthDate.length > 0 &&
            (new Date(newStudent.birthDate) < new Date(maxBirthDate)));

        if (amount !== studentsAmount) {
            alertSuccess(true, `Student ${newStudent.firstName} ${newStudent.lastName} has be added.`);
            setAmount(studentsAmount);
            setNewStudent({...newStudent,
                firstName: '',
                lastName: '',
                birthDate: ''
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newStudent.firstName, newStudent.lastName, newStudent.birthDate, maxBirthDate, studentsAmount]);

    const handleTextField = event => {
        setNewStudent({...newStudent, [event.target.name]: event.target.value})
    };

    const addStudentHandling = () => {
        let student = newStudent;
        student.birthDate = new Date(student.birthDate);
        addStudent(student);
    };

    return (
        <form className={classes.root}>
            {request.adding ? <Spinner/> :
                <>
                    <TextField
                        className={classes.names}
                        label='first name'
                        name='firstName'
                        value={newStudent.firstName}
                        onChange={handleTextField}
                    />
                    <TextField
                        className={classes.names}
                        label='last name'
                        name='lastName'
                        value={newStudent.lastName}
                        onChange={handleTextField}
                    />
                    <TextField
                        label='birth date'
                        name='birthDate'
                        value={newStudent.birthDate}
                        type='date'
                        format='dd/MM/yyyy'
                        onChange={handleTextField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={new Date(newStudent.birthDate) >= new Date(maxBirthDate)}
                    />
                    <Fab
                        color='primary'
                        className={classes.button}
                        aria-label='add'
                        onClick={addStudentHandling}
                        disabled={!isAccept}
                    >
                        <DoneIcon/>
                    </Fab>
                </>
            }
        </form>
    )
};

StudentForm.propTypes = {
    request: PropTypes.object.isRequired,
    addStudent: PropTypes.func.isRequired,
    maxBirthDate: PropTypes.string.isRequired,
    studentsAmount: PropTypes.number.isRequired,
    alertSuccess: PropTypes.func.isRequired
};

export default StudentForm;
