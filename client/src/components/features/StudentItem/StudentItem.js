import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Collapse, Card, CardBody} from 'reactstrap';
import Button from "../../common/Button/Button";
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import './StudentItem.scss';

const StudentItem = props => {
    const {student, i, setCollapseIndex, selectedIndex, updateStudent, request, deleteStudent} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [studentItem, setStudentItem] = useState({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        birthDate: student.birthDate.substring(0, 10)
    });

    useEffect(() => {
        if (selectedIndex !== i) setIsOpen(false);
    }, [selectedIndex, i]);

    const collapseHandling = () => {
        setIsOpen(!isOpen);
        setCollapseIndex(i);
    };

    const updateHandling = () => {
        if (Array.from(studentItem.birthDate).length && new Date(studentItem.birthDate) < new Date()) {
            setIsEdit(false);
            updateStudent(studentItem);
        }
    };

    const deleteHandling = isDelete => {
        setModalIsOpen(false);
        if (isDelete) deleteStudent(studentItem.id);
    };

    const inputsHandling = e => {
        setIsEdit(true);
        setStudentItem({...studentItem, [e.target.name]: e.target.value})
    };

    return (
        <div>
            <div className='parent-item-main' onClick={collapseHandling}>
                <span className='text-left col-1'>{i + 1}</span>
                <span className='text-left col-2'>{student.lastName}</span>
                <span className='text-left col-2'>{student.firstName}</span>
                <span className='text-center col-2'>{student.birthDate.substring(0, 10)}</span>
                <span className='text-center col-3'>{student.parent}</span>
                <span className='text-center col-2'>{student.class}</span>
            </div>
            <Collapse isOpen={isOpen}>
                <Card className='parent-item-card'>
                    <CardBody className='parent-collapse student-collapse'>
                        <input disabled={request.adding} type="text" name='lastName' value={studentItem.lastName}
                               onChange={inputsHandling}
                               className={`${request.adding ? 'progress-votes' : 'not-progress'}`}/>
                        <input disabled={request.adding} type="text" name='firstName' value={studentItem.firstName}
                               onChange={inputsHandling}
                               className={`${request.adding ? 'progress-votes' : 'not-progress'}`}/>
                        <input disabled={request.adding} type="date" name='birthDate' value={studentItem.birthDate}
                               onChange={inputsHandling}
                               className={`${request.adding ? 'progress-votes' : 'not-progress'}`}/>
                        <Button disabled={!isEdit || request.adding} variant={!isEdit || request.adding ?
                            `off ${request.adding ? 'progress-votes' : 'not-progress'}` : `success ${request.adding ?
                                'progress-votes' : 'not-progress'}`} onClick={updateHandling}>Update</Button>
                        <Button variant='danger' onClick={() => setModalIsOpen(true)}>Remove</Button>
                    </CardBody>
                </Card>
            </Collapse>
            <ModalAreYouSure
                description={`Are you sure you want to delete the student ${studentItem.lastName}
                 ${studentItem.firstName}?`}
                isOpen={modalIsOpen}
                isConfirm={deleteHandling}/>
        </div>
    )

};

StudentItem.propTypes = {
    student: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    setCollapseIndex: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    updateStudent: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    deleteStudent: PropTypes.func.isRequired
};

export default StudentItem;
