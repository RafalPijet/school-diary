import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import './UserSelect.scss';

class UsersSelect extends React.Component {
    state = {
        availableUsers: [],
        selectedUser: {},
        disabled: !this.props.isStudent
    };

    componentWillReceiveProps(nextProps) {

        if (!nextProps.request.working) {
            nextProps.isStudent ? this.setAvailableUsers(true, nextProps.students, nextProps.classes) :
                this.setAvailableUsers(false, nextProps.teachers, nextProps.classes)
        }
        this.setState({disabled: nextProps.request.working});
        this.setState({disabled: this.state.availableUsers.length !== 0});
    }

    checkTeacherSubject = teacher => {
        const {subjectTeachers} = this.props.classItem;
        let result = true;
        subjectTeachers.forEach(item => {
            if (item.subject === teacher.subject) result = false;
        });
        return result;
    };

    setAvailableUsers = async (isStudent, users, classes) => {
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
        await this.setState({selectedUser: this.state.availableUsers[0]});
        if (this.state.selectedUser) this.setState({disabled: !this.checkTeacherSubject(this.state.selectedUser)});
    };

    userHandling = async event => {
        const {checkTeacherSubject} = this;
        const {isStudent} = this.props;
        await this.setState({selectedUser: JSON.parse(event.target.value)});
        this.setState({disabled: !isStudent && !checkTeacherSubject(this.state.selectedUser)});
    };

    addUser = () => {
        this.props.addUser(this.props.isStudent, this.state.selectedUser);
    };

    render() {
        const {groupName, buttonName, isStudent} = this.props;
        const {availableUsers, selectedUser, disabled} = this.state;
        const {userHandling, addUser} = this;
        return (
            <div className='select-user-main'>
                <select className='select-item' name={groupName} onChange={userHandling} value={JSON.stringify(selectedUser)}>
                    <optgroup label={groupName}>
                        {availableUsers.map((user, i) => {
                            return <option key={i} value={JSON.stringify(user)}>
                                {`${user.firstName} ${user.lastName} ${!isStudent ? ` - ${user.subject}` : ''}`}
                            </option>
                        })}
                    </optgroup>
                </select>
                <div className='button-add'>
                    <Button hidden={availableUsers.length === 0} disabled={disabled}
                            variant={disabled ? 'off' : 'success'}
                            onClick={() => addUser()}>{buttonName}
                    </Button>
                </div>
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
    isStudent: PropTypes.bool.isRequired,
    addUser: PropTypes.func.isRequired,
    classItem: PropTypes.object.isRequired
};

export default UsersSelect;
