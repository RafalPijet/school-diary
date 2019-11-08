import React from 'react';
import {connect} from 'react-redux';
import {getTeacherAllClass} from "../../../redux/actions/classActions";
import {getUser} from "../../../redux/actions/usersActions";
import {loadAllClassByTeacherId} from "../../../redux/thunks";
import PageTitle from '../../common/PageTitle/PageTitle';
import ClassBoxList from '../../features/ClassBoxList/ClassBoxList';

const ClassDiaries = props => {
    const {loadClasses, user, classes} = props;
    return (
        <div>
            <PageTitle>Class Diaries</PageTitle>
            <ClassBoxList classes={classes} user={user} loadClasses={loadClasses}/>
        </div>
    )
};

const mapStateToProps = state => ({
    classes: getTeacherAllClass(state),
    user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
    loadClasses: teacherId => dispatch(loadAllClassByTeacherId(teacherId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassDiaries);
