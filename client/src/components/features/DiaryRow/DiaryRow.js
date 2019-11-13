import React from 'react';
import PropTypes from 'prop-types';

const DiaryRow = props => {
    const {student, i} = props;
    return (
        <tr>
            <td>{i + 1}</td>
            <td>{`${student.firstName} ${student.lastName}`}</td>
            <td>{student.ratings.length}</td>
        </tr>
    )
};

DiaryRow.propTypes = {
    student: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};

export default DiaryRow
