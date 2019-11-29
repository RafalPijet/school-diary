import React from 'react';
import PropTypes from 'prop-types';
import './ClassItem.scss';

class ClassItem extends React.Component {

    render() {
        const {classItem} = this.props;
        return (
            <div className='class-item-main'>
                <h3>{classItem.name}</h3>
                <h4>{`students amount: ${classItem.students.length}`}</h4>
                <h4>{`teachers amount: ${classItem.subjectTeachers.length}`}</h4>
                <h4>{`main teacher: ${classItem.mainTeacher.firstName} ${classItem.mainTeacher.lastName}`}</h4>
            </div>
        )
    }
}

ClassItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default ClassItem;
