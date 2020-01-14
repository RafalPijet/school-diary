import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SelectItem from "../../common/SelectItem/SelectItem";

const ParentItemCollapse = props => {
    const {students, allClasses, allStudents} = props;
    const [parentStudents, setParentStudents] = useState([]);
    const [studentsWithoutParent, setStudentsWithoutParent] = useState([]);

    useEffect(() => {
        prepareStudents();
    }, []);

    // useEffect(() => {
    //     console.log(studentsWithoutParent.length);
    // });

    const getNewStudentForParent = student => {
        console.log(student)
    };

    const prepareStudents = () => {
        let parentStudents = [];
        students.forEach(student => {
            let item = {
                className: checkStudentClass(student.id) !== null ? checkStudentClass(student.id) : "None",
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
            <div>
                <SelectItem
                    list={studentsWithoutParent}
                    selectName='unassigned students'
                    buttonName="Assign"
                    confirmSelect={getNewStudentForParent}/>
                {parentStudents.map((student, i) => {
                    return (
                        <div key={i}>
                            <span>{`${student.firstName} ${student.lastName} ${student.className}`}</span>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div>
                <SelectItem list={studentsWithoutParent}
                            selectName='unassigned students'
                            buttonName="Assign"
                            confirmSelect={getNewStudentForParent}/>
                <span>The parent has no student assigned</span>
            </div>
        )
    }

};

ParentItemCollapse.propTypes = {
    students: PropTypes.array.isRequired,
    allClasses: PropTypes.array.isRequired,
    allStudents: PropTypes.array.isRequired
};

export default ParentItemCollapse;
