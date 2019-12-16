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

            if (nextProps.isAdding) {
                nextProps.isStudent ? this.setAvailableUsers(true, true, nextProps.students, nextProps.classes) :
                    this.setAvailableUsers(true, false, nextProps.teachers, nextProps.classes)
            } else {
                nextProps.isStudent ? this.setAvailableUsers(false, true, nextProps.students, nextProps.classes) :
                    this.setAvailableUsers(false, false, nextProps.teachers, nextProps.classes)
            }

        }
        this.setState({disabled: nextProps.request.working});
    }

    checkTeacherSubject = teacher => {
        const {subjectTeachers} = this.props.classItem;
        let result = true;
        subjectTeachers.forEach(item => {
            if (item.subject === teacher.subject) result = false;
        });
        return result;
    };

    setAvailableUsers = async (isAdding, isStudent, users, classes) => {
        this.setState({availableUsers: []});

        if (isAdding) {
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
        } else {
            let selectedClass = classes.filter(item => item.id === this.props.classItem.id);
            isStudent ? this.setState({availableUsers: selectedClass[0].students}) :
                this.setState({availableUsers: selectedClass[0].subjectTeachers});
        }
        await this.setState({selectedUser: this.state.availableUsers[0]});
        if (isAdding && this.state.selectedUser && !isStudent) this.setState({disabled: !this.checkTeacherSubject(this.state.selectedUser)});
    };

    userHandling = async event => {
        const {checkTeacherSubject} = this;
        const {isStudent, isAdding} = this.props;
        await this.setState({selectedUser: JSON.parse(event.target.value)});
        if (isAdding) this.setState({disabled: !isStudent && !checkTeacherSubject(this.state.selectedUser)});

    };

    buttonAction = () => {
        this.props.buttonHandling(this.props.isStudent, this.state.selectedUser);
    };

    render() {
        const {groupName, buttonName, isStudent} = this.props;
        const {availableUsers, selectedUser, disabled} = this.state;
        const {userHandling, buttonAction} = this;
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
                            onClick={() => buttonAction()}>{buttonName}
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
    buttonHandling: PropTypes.func.isRequired,
    classItem: PropTypes.object.isRequired,
    isAdding: PropTypes.bool.isRequired
};

export default UsersSelect;
