import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Collapse, CardBody, Card} from 'reactstrap';
import TextField from "../../common/TextField/TextField";
import Button from "../../common/Button/Button";
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import StudentsList from "../StudentsList/StudentListContainer";
import './StudentsHandling.scss';

const StudentsHandling = props => {
    const {addStudent, request, errorRequest, resetRequest} = props;
    const defaultStudent = {
        firstName: '',
        lastName: '',
        birthDate: '2000-01-01',
        ratings: [],
        parents: []
    };
    const [newStudent, setNewStudent] = useState(defaultStudent);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (request.success && newStudent.birthDate !== '2000-01-01') {
            setIsSuccess(true);
            resetRequest();
            setTimeout(() => {
                setIsSuccess(false);
            }, 5000);
            setNewStudent(defaultStudent);
        }
        if (request.error !== null) {
            setIsError(true);
            setTimeout(() => {
                resetRequest();
                setIsError(false);
            }, 5000);
        }
    }, [request, defaultStudent, resetRequest, newStudent]);

    const newStudentHandling = event => {
        setNewStudent({...newStudent, [event.target.name]: event.target.value});
    };

    const addNewStudent = event => {
        event.preventDefault();

        if (newStudent.firstName.length && newStudent.lastName.length &&
            newStudent.birthDate !== '2000-01-01' && (new Date(newStudent.birthDate) < new Date())) {
            addStudent(newStudent);
        } else {
            errorRequest('Wrong data!!!');
        }
    };

    return (
        <div>
            <div className='students-handling-main' onClick={() => setIsOpen(!isOpen)}>
                <h3 className='text-center'>Add student</h3>
            </div>
            <Collapse isOpen={isOpen} onEntered={() => resetRequest()}>
                <Card>
                    <CardBody className={request.pending ? 'students-handling-card center' : 'students-handling-card'}>
                        <Fragment>
                            {isSuccess ?
                                <Alert variant='success' isVisible={true}>The student has been added</Alert> : ''}
                            {isError ?
                                <Alert variant='error' isVisible={isError}>{request.error}</Alert> : ''}
                            {request.pending ? <Spinner/> :
                                <div className='form-main'>
                                    <TextField
                                        label='first name'
                                        name='firstName'
                                        onChange={newStudentHandling}
                                        value={newStudent.firstName}
                                        type='text'/>
                                    <TextField
                                        label='last name'
                                        name='lastName'
                                        onChange={newStudentHandling}
                                        value={newStudent.lastName}
                                        type='text'/>
                                    <TextField
                                        label='birth Date'
                                        name='birthDate'
                                        onChange={newStudentHandling}
                                        value={newStudent.birthDate}
                                        type='date'/>
                                    <Button variant={(isError || isSuccess) ? 'off' : 'success'}
                                            disabled={isError || isSuccess}
                                            onClick={addNewStudent}
                                    >Add student</Button>
                                </div>
                            }
                        </Fragment>
                    </CardBody>
                </Card>
            </Collapse>
            <div className='students-handling-main' onClick={() => setIsOpen(!isOpen)}>
                <h3 className='text-center'>Students list</h3>
            </div>
            <Collapse isOpen={!isOpen}>
                <Card>
                    <CardBody>
                        <StudentsList/>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
};

StudentsHandling.propTypes = {
    addStudent: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    errorRequest: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default StudentsHandling;
