import React from 'react';
import PropTypes from 'prop-types';

class UsersSelect extends React.Component {
    render() {
        const {groupName} = this.props;
        return (
            <div>
                <select name={groupName}>
                    <optgroup label={groupName}>

                    </optgroup>
                </select>
            </div>
        )
    }
}

UsersSelect.propTypes = {
    groupName: PropTypes.string.isRequired
};

export default UsersSelect;
