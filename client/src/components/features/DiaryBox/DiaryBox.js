import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../../common/Alert/Alert';
import './DiaryBox.scss';

class DiaryBox extends React.Component {

    render() {
        const {request, selectedClass} = this.props;

        if (request.pending) {
            return (
                <div className="diary-box-main">
                    <Alert variant="info" isVisible={true}>Searching classes...</Alert>
                </div>
            )
        } else if (Object.entries(selectedClass).length === 0) {
            return (
                <div className="diary-box-main">
                    <Alert variant="success" isVisible={true}>Select a class</Alert>
                </div>
            )
        } else if (Object.entries(selectedClass).length !== 0) {
            return (
                <div className="diary-box-main">
                    Diary Box
                </div>
            )
        }
    }
}

DiaryBox.propTypes = {
    request: PropTypes.object.isRequired,
    selectedClass: PropTypes.object.isRequired
};

export default DiaryBox;
