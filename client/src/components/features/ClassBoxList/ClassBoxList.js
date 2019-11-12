import React from 'react';
import PropTypes from 'prop-types';
import ClassBox from '../../features/ClassBox/ClassBox';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class ClassBoxList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadClasses(this.props.user.id);
        console.log('wow');
    }

    render() {
        const {classes, request} = this.props;

        if (request.pending) {
            return <Spinner/>
        } else if (!request.pending && request.error) {
            return <Alert variant="error" isVisible={true}>{request.error}</Alert>
        } else {
            return (
                <ul>
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
