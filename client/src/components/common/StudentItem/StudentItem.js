import React from 'react';
import PropTypes from 'prop-types';

const StudentItem = props => {
    const {student} = props;
    return (
        <div></div>
    )
};

export default StudentItem;

StudentItem.propTypes = {
    student: PropTypes.object.isRequired
};
