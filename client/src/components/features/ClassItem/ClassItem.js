import React from 'react';
import PropTypes from 'prop-types';
import {UncontrolledCollapse, CardBody, Card} from 'reactstrap';
import UsersList from '../../common/UsersList/UsersList';
import UsersSelect from '../../common/UsersSelect/UsersSelectContainer';
import './ClassItem.scss';

class ClassItem extends React.Component {

    render() {
        const {classItem} = this.props;
        return (
            <div>
                <div className='class-item-main' id={`toggler${classItem.id}`}>
                    <h3>{classItem.name}</h3>
                    <h4 className='students'>{`students amount: ${classItem.students.length}`}</h4>
                    <h4 className='teachers'>{`teachers amount: ${classItem.subjectTeachers.length}`}</h4>
                    <h4>{`main teacher: ${classItem.mainTeacher.firstName} ${classItem.mainTeacher.lastName}`}</h4>
                </div>
                <UncontrolledCollapse toggler={`#toggler${classItem.id}`}>
                    <Card>
                        <CardBody>
                            <div className='users-box'>
                                <UsersList users={classItem.students} color='students-back'/>
                                <UsersList users={classItem.subjectTeachers} color='teachers-back'/>
                                <div>
                                    <UsersSelect isStudent={true} groupName='students available' buttonName='Add student'/>
                                    <UsersSelect isStudent={false} groupName='teachers available' buttonName='Add teacher'/>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>
            </div>
        )
    }
}

ClassItem.propTypes = {
    classItem: PropTypes.object.isRequired
};

export default ClassItem;
