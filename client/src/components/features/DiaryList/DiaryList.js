import React from 'react';
import {Table} from 'reactstrap';
import PropTypes from 'prop-types';
import DiaryRow from '../../features/DiaryRow/DiaryRowContainer';

const DiaryList = props => {
    const {students} = props.selectedClass;
    const {teacher} = props;
    return (
        <Table dark>
            <thead>
                <tr>
                    <td></td>
                    <td>Student</td>
                    <td>Ratings</td>
                </tr>
            </thead>
            <tbody>
            {students.map((student, i) => {
                return <DiaryRow key={student.id} student={student} i={i} teacher={teacher}/>
            })}
            </tbody>
        </Table>
    )
};

DiaryList.propTypes = {
    selectedClass: PropTypes.object.isRequired,
    teacher: PropTypes.object.isRequired
};

export default DiaryList;
