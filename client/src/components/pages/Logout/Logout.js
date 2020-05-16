import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setLogin, setUser, loadParents, loadTeachers} from "../../../redux/actions/usersActions";
import {resetRequest} from "../../../redux/actions/requestActions";
import {loadAllClasses, loadClassByTeacher,setSelectedClass} from "../../../redux/actions/classActions";
import {loadAllStudents} from "../../../redux/actions/studentActions";
import {Redirect} from "react-router";

const Logout = props => {
    const {
        setLogin,
        resetRequest,
        setUser,
        loadTeachers,
        loadParents,
        loadAllClasses,
        loadClassByTeacher,
        loadAllStudents,
        setSelectedClass
    } = props;

    useEffect(() => {
        setLogin(false);
        resetRequest();
        setUser({});
        loadParents([]);
        loadTeachers([]);
        loadClassByTeacher([]);
        loadAllClasses([]);
        loadAllStudents([]);
        setSelectedClass({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <Redirect to='/'/>

};

const mapDispatchToProps = dispatch => ({
    setLogin: isLogin => dispatch(setLogin(isLogin)),
    setUser: user => dispatch(setUser(user)),
    setSelectedClass: classItem => dispatch(setSelectedClass(classItem)),
    loadTeachers: teachers => dispatch(loadTeachers(teachers)),
    loadParents: parents => dispatch(loadParents(parents)),
    loadAllClasses: classes => dispatch(loadAllClasses(classes)),
    loadClassByTeacher: classes => dispatch(loadClassByTeacher(classes)),
    loadAllStudents: students => dispatch(loadAllStudents(students)),
    resetRequest: () => dispatch(resetRequest())
});

export default connect(null, mapDispatchToProps)(Logout);
