import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import ClassItem from '../../features/ClassItem/ClassItem';

class ClassesBox extends React.Component {
    componentDidMount() {
        this.props.loadAllClasses();
    }

    render() {
        const {request, allClasses} = this.props;
        
        if (request.pending) {
            return <Spinner/>
        } else if(request.error !== null) {
            return <Alert variant='error'>{request.error}</Alert>
        } else {
            return (
                <div>
                    {allClasses.map(classItem => {
                        return <ClassItem key={classItem.id} classItem={classItem}/>
                    })}
                </div>
            )
        }
    }
}

ClassesBox.propTypes = {
    loadAllClasses: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    allClasses: PropTypes.array.isRequired
};

export default ClassesBox;
