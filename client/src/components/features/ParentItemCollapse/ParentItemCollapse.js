import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SelectItem from "../../common/SelectItem/SelectItem";
import './ParentItemCollapse.scss';

const ParentItemCollapse = props => {
    const {parent, allClasses, allStudents, updateUser, updateStudent, request} = props;
    const [parentStudents, setParentStudents] = useState([]);
    const [studentsWithoutParent, setStudentsWithoutParent] = useState([]);

    useEffect(() => {
        prepareStudents();
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

    const prepareStudents = () => {
        let parentStudents = [];
        parent.students.forEach(student => {
            let item = {
                id: student.id,
                className: checkStudentClass(student.id) !== null ? checkStudentClass(student.id) : "None class",
                firstName: student.firstName,
                lastName: student.lastName
            };
            parentStudents = [...parentStudents, item];
        });
        setParentStudents(parentStudents);
        setStudentsWithoutParent(allStudents.filter(student => student.parents.length === 0));
    };

    const checkStudentClass = studentId => {
        let className = null;
        allClasses.forEach(item => {
            item.students.forEach(student => {
                if (student.id === studentId) {
                    className = item.name;
                }
            })
        });
        return className
    };

    if (parentStudents.length) {
        return (
            <div className='parent-collapse-item'>
                <SelectItem
                    list={studentsWithoutParent}
                    selectName='unassigned students'
                    buttonName="Assign"
                    isDisabled={request.adding}
                    confirmSelect={getNewStudentForParent}
                />
                <SelectItem
                    list={parentStudents}
                    selectName='assigned students'
                    buttonName='Unassign'
                    confirmSelect={removeStudentFromParent}
                    isDisabled={request.adding}/>
                <div>
                    {parentStudents.map((student, i) => {
                        return (
                        <p key={i}>
                            {`${i + 1}. ${student.firstName} ${student.lastName} - ${student.className}`}
                        </p>
                        )})}
                </div>

            </div>
        )
    } else {
        return (
            <div className='parent-collapse-item'>
                <SelectItem list={studentsWithoutParent}
                            selectName='unassigned students'
                            buttonName="Assign"
                            isDisabled={request.adding}
                            confirmSelect={getNewStudentForParent}/>
                <span>The parent has no student assigned</span>
            </div>
        )
    }

};

ParentItemCollapse.propTypes = {
    parent: PropTypes.object.isRequired,
    allClasses: PropTypes.array.isRequired,
    allStudents: PropTypes.array.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default ParentItemCollapse;
