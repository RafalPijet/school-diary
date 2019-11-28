import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class ClassesBox extends React.Component {
    componentDidMount() {
        this.props.loadAllClasses();
    }

    render() {
        const {request} = this.props;

        if (request.pending) {
            return <Spinner/>
        } else if(request.error !== null) {
            return <Alert variant='error'>{request.error}</Alert>
        } else {
            return (
                <div>
                    ClassesBox
                </div>
            )
        }
    }
}

ClassesBox.propTypes = {
    loadAllClasses: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default ClassesBox;
