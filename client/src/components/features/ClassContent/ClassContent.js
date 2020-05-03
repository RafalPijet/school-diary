import React from 'react';
import PropTypes from 'prop-types'

const ClassContent = props => {
    const {classItem, allStudents, request, resetRequest, teachers} = props;
    return (
        <></>
    )
};

ClassContent.propTypes = {
    classItem: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    teachers: PropTypes.array.isRequired,
    resetRequest: PropTypes.func.isRequired,
    allStudents: PropTypes.array.isRequired
};

export default ClassContent
