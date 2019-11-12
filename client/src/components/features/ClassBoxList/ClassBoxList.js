import React from 'react';
import PropTypes from 'prop-types';
import ClassBox from '../../features/ClassBox/ClassBoxContainer';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import './ClassBoxList.scss';

class ClassBoxList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadClasses(this.props.user.id);
    }

    render() {
        const {classes, request} = this.props;

        if (request.pending) {
            return (
                <div className="empty-space">
                    <Spinner/>
                </div>
            )
        } else if (!request.pending && request.error) {
            return (
                <div className="empty-space">
                    <Alert variant="error" isVisible={true}>{request.error}</Alert>
                </div>
            )
        } else {
            return (
                <ul className="box-list-main">
                    {classes.map((diary, i) => {
                        return <ClassBox key={i} diary={diary}/>
                    })}
                </ul>
            )
        }
    }
}

ClassBoxList.propTypes = {
    classes: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    loadClasses: PropTypes.func.isRequired
};

export default ClassBoxList;
