import React from 'react';
import PropTypes from 'prop-types';
import './UsersList.scss';

const UsersList = props => {
    const {users, color} = props;
    return (
        <div className={`user-column ${color}`}>
            {users.map((user, i) => {
                return <p className='user-row' key={i}>{`${i + 1}. ${user.firstName} ${user.lastName}`}</p>
            })}
        </div>
    )
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired
};

export default UsersList;
