import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import ClassItem from '../../features/ClassItem/ClassItem';

class ClassesBox extends React.Component {
    componentDidMount() {
        this.prepareState();
    }

    componentWillUnmount() {
        const {resetRequest} = this.props;
        resetRequest();
    }

    prepareState = async () => {
        const {loadAllClasses, loadAllStudents} = this.props;
        await loadAllClasses();
        await loadAllStudents()
    };

    render() {
        const {request, allClasses, addStudent, addTeacher} = this.props;

        if (request.pending) {
            return <Spinner/>
        } else if(request.error !== null) {
            return <Alert variant='error'>{request.error}</Alert>
        } else {
            return (
                <div>
                    {allClasses.map(classItem => {
                        return <ClassItem
                            key={classItem.id}
                            classItem={classItem}
                            addStudent={addStudent}
                            addTeacher={addTeacher}
                        />
                    })}
                </div>
            )
        }
    }
}

ClassesBox.propTypes = {
    loadAllClasses: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    allClasses: PropTypes.array.isRequired,
    loadAllStudents: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    addTeacher: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired
};

export default ClassesBox;
