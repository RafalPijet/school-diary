import React from 'react';
import PropTypes from 'prop-types';

class ParentsHandling extends React.Component {
    componentDidMount() {
        const {loadParents} = this.props;
        loadParents();
    }

    render() {
        return (
            <div>ParentsHandling</div>
        )
    }
}

ParentsHandling.propTypes = {
    loadParents: PropTypes.func.isRequired,
    parents: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired
};

export default ParentsHandling;
