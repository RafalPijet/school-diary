import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SelectItem from "../../common/SelectItem/SelectItem";
import './ParentItemCollapse.scss';
// import Button from "../../common/Button/Button";
import {Button} from "@material-ui/core";
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import {checkStudentClass} from "../../../utilities/functions";

const ParentItemCollapse = props => {
    const {parent, allClasses, allStudents, updateUser, updateStudent, request, deleteParent} = props;
    const [parentStudents, setParentStudents] = useState([]);
    const [studentsWithoutParent, setStudentsWithoutParent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let parentStudents = [];
        parent.students.forEach(student => {
            let item = {
                id: student.id,
                className: checkStudentClass(allClasses, student.id) !== null ?
                    checkStudentClass(allClasses, student.id) : "None class",
                firstName: student.firstName,
                lastName: student.lastName
            };
            parentStudents = [...parentStudents, item];
        });
        setParentStudents(parentStudents);
        setStudentsWithoutParent(allStudents.filter(student => student.parents.length === 0));
    }, [allClasses, allStudents, parent]);

    const getNewStudentForParent = async student => {
        parent.students.push(student);
        await updateUser(parent);
        parent.students = [];
        student.parents.push(parent);
        updateStudent(student);
    };

    const removeStudentFromParent = student => {
        let removedStudent = parent.students.find(item => item.id === student.id);
        removedStudent.parents = [];
        parent.students = parent.students.filter(item => item.id !== student.id);
        updateUser(parent);
        updateStudent(removedStudent);
    };

    const modalHandling = isDelete => {
        setIsModalOpen(false);
        if (isDelete) {
            if (parent.students.length) {
                parent.students.forEach(item => {
                    item.parents = [];
                    updateStudent(item);
                })
            }
            deleteParent(parent.id);
        }
    };

    return (
        <div className='parent-collapse-item'>
            <ModalAreYouSure
                user={parent}
                isOpen={isModalOpen}
                isConfirm={modalHandling}
                description='Are you sure you want to delete the parent'/>
            <Button
                disabled={request.adding}
                size='small'
                variant='outlined'
                color='secondary'
                onClick={() => setIsModalOpen(true)}
            >
                Remove parent
            </Button>
            <SelectItem
                list={studentsWithoutParent}
                selectName='unassigned students'
                buttonName="Assign"
                helperText='assign a student to the parent'
                isDisabled={request.adding || !studentsWithoutParent.length}
                confirmSelect={getNewStudentForParent}
            />
            <SelectItem
                list={parentStudents}
                selectName='assigned students'
                buttonName='Unassign'
                helperText='unassign a student to the parent'
                confirmSelect={removeStudentFromParent}
                isDisabled={request.adding || !parentStudents.length}/>
            <div>
                {parentStudents.length ? parentStudents.map((student, i) => {
                    return (
                        <p key={i}>
                            {`${i + 1}. ${student.firstName} ${student.lastName} - ${student.className}`}
                        </p>
                    )
                }) : <span>The parent has no student assigned</span>}
            </div>
        </div>
    )


};

ParentItemCollapse.propTypes = {
    parent: PropTypes.object.isRequired,
    allClasses: PropTypes.array.isRequired,
    allStudents: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    deleteParent: PropTypes.func.isRequired
};

export default ParentItemCollapse;
