import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../../common/Alert/Alert';
import DiaryList from '../../features/DiaryList/DiaryList';
import './DiaryBox.scss';

class DiaryBox extends React.Component {

    render() {
        const {request, selectedClass, teacher} = this.props;
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
                    <DiaryList selectedClass={selectedClass} teacher={teacher}/>
                </div>
            )
        }
    }
}

DiaryBox.propTypes = {
    request: PropTypes.object.isRequired,
    selectedClass: PropTypes.object.isRequired,
    teacher: PropTypes.object.isRequired
};

export default DiaryBox;
