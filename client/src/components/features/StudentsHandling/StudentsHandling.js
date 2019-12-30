import React from 'react';
import PropTypes from 'prop-types';
import {UncontrolledCollapse, CardBody, Card} from 'reactstrap';
import TextField from "../../common/TextField/TextField";
import Button from "../../common/Button/Button";
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import './StudentsHandling.scss';

class StudentsHandling extends React.Component {
    state = {
        newStudent: {
            firstName: '',
            lastName: '',
            birthDate: 'yyyy-mm-dd',
            ratings: [],
            parents: []
        },
        isError: false,
        isSuccess: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.request.error !== null) {
            this.errorHandling(nextProps.request.error);
        }
        if (nextProps.request.success) {
            this.setState({
                newStudent: {firstName: '', lastName: '', birthDate: 'yyyy-mm-dd'}
            });
            this.successHandling();
        }
    }

    errorHandling = () => {
        const {resetRequest} = this.props;
        this.setState({isError: true});
        setTimeout(() => {
            this.setState({isError: false});
            resetRequest();
        }, 6000);
    };

    successHandling = () => {
        const {resetRequest, request} = this.props;
        request.success ? this.setState({isSuccess: true}) : this.setState({isSuccess: false});
        setTimeout(() => {
            this.setState({isSuccess: false});
            resetRequest();
        }, 6000);
    };

    newStudentHandling = event => {
        const {newStudent} = this.state;
        this.setState({newStudent: {...newStudent, [event.target.name]: event.target.value}})
    };

    addStudent = event => {
        const {newStudent} = this.state;
        const {addStudent, errorRequest} = this.props;
        event.preventDefault();

        if (newStudent.firstName.length && newStudent.lastName.length &&
            newStudent.birthDate !== 'yyyy-mm-dd' && (new Date(newStudent.birthDate) < new Date())) {
            addStudent(newStudent);
        } else {
            errorRequest('Wrong data!!!');
        }
    };

    render() {
        const {newStudentHandling, addStudent} = this;
        const {newStudent, isError, isSuccess} = this.state;
        const {request} = this.props;

        if (request.pending) {
            return (
                <form>
                    <div className='students-handling-main' id='togglerAddStudent'>
                        <h3 className='text-center'>Add student</h3>
                    </div>
                    <UncontrolledCollapse toggler='#togglerAddStudent'>
                        <Card>
                            <CardBody>
                                <Spinner/>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </form>
            )
        } else if (request.error !== null) {
            return (
                <form>
                    <div className='students-handling-main' id='togglerAddStudent'>
                        <h3 className='text-center'>Add student</h3>
                    </div>
                    <UncontrolledCollapse toggler='#togglerAddStudent'>
                        <Card>
                            <CardBody>
                                <Alert variant='error' isVisible={isError}>{request.error}</Alert>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </form>
            )
        } else if (isSuccess) {
            return (
                <div>
                    <div className='students-handling-main' id='togglerAddStudent'>
                        <h3 className='text-center'>Add student</h3>
                    </div>
                    <UncontrolledCollapse toggler='#togglerAddStudent'>
                        <Card>
                            <CardBody>
                                <Alert variant='success' isVisible={true}>The student has been added</Alert>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </div>
            )
        } else {
            return (
                <form onSubmit={addStudent}>
                    <div className='students-handling-main' id='togglerAddStudent'>
                        <h3 className='text-center'>Add student</h3>
                    </div>
                    <UncontrolledCollapse toggler='#togglerAddStudent'>
                        <Card>
                            <CardBody>
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
                                    <Button variant='success' onClick={addStudent}>Add student</Button>
                                </div>
                            </CardBody>
                        </Card>
                    </UncontrolledCollapse>
                </form>
            )
        }
    }
}

StudentsHandling.propTypes = {
    addStudent: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    errorRequest: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default StudentsHandling;
