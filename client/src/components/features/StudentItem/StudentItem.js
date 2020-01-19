import React from 'react';
import PropTypes from 'prop-types';

const StudentItem = props => {
    const {student, i} = props;

    return (
        <div>
            <div className='parent-item-main'>
                <span className='text-left col-1'>{i + 1}</span>
                <span className='text-left col-2'>{student.lastName}</span>
                <span className='text-left col-2'>{student.firstName}</span>
                <span className='text-center col-2'>{student.birthDate.substring(0, 10)}</span>
                <span className='text-center col-3'>{student.parent}</span>
                <span className='text-center col-2'>{student.class}</span>
            </div>
        </div>
    )

};

StudentItem.propTypes = {
    student: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};

export default StudentItem;
