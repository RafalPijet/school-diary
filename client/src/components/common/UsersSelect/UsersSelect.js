import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';

class UsersSelect extends React.Component {
    state = {
        availableUsers: [],
        selectedUser: {}
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.request.working) {
            nextProps.isStudent ? this.setAvailableUsers(true, nextProps.students) :
                this.setAvailableUsers(false, nextProps.teachers)
        }
    }

    setAvailableUsers = async (isStudent, users) => {
        const {classes} = this.props;
        this.setState({availableUsers: []});

        let usersInClasses = [];
        await classes.forEach(item => {
            isStudent ? item.students.forEach(student => usersInClasses.push(JSON.stringify(student))) :
                item.subjectTeachers.forEach(teacher => usersInClasses.push(JSON.stringify(teacher)));
        });

        await users.forEach(user => {

            if (!usersInClasses.includes(JSON.stringify(user))) {
                this.setState({availableUsers: [...this.state.availableUsers, user]})
            }
        });
        this.setState({selectedUser: this.state.availableUsers[0]});
    };

    userHandling = event => {
        this.setState({selectedUser: JSON.parse(event.target.value)});
    };

    render() {
        const {groupName, buttonName} = this.props;
        const {availableUsers, selectedUser} = this.state;
        const {userHandling} = this;
        return (
            <div>
                <select name={groupName} onChange={userHandling} value={JSON.stringify(selectedUser)}>
                    <optgroup label={groupName}>
                        {availableUsers.map((user, i) => {
                            return <option key={i} value={JSON.stringify(user)}>
                                {`${user.firstName} ${user.lastName}`}
                            </option>
                        })}
                    </optgroup>
                </select>
                <Button variant='primary'>{buttonName}</Button>
            </div>
        )
    }
}

UsersSelect.propTypes = {
    groupName: PropTypes.string.isRequired,
    buttonName: PropTypes.string.isRequired,
    request: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
    classes: PropTypes.array.isRequired,
    teachers: PropTypes.array.isRequired,
    isStudent: PropTypes.bool.isRequired
};

export default UsersSelect;
