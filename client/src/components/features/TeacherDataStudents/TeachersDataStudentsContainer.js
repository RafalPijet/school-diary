import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getTeacherAllClass} from "../../../redux/actions/classActions";
import {getTeacherStudentsNameRequest, getTeacherStudentsByIdRequest} from "../../../redux/thunks";
import {getAllStudents, getClassesStudents, loadAllStudents, setClassesStudents} from "../../../redux/actions/studentActions";
import TeacherDataStudents from "./TeacherDataStudents";

const mapStateToProps = state => ({
    request: getRequest(state),
    teacherAllClass: getTeacherAllClass(state),
    allStudents: getAllStudents(state),
    classesStudents: getClassesStudents(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeacherStudentsName: classesId => dispatch(getTeacherStudentsNameRequest(classesId)),
    loadTeacherStudents: students => dispatch(getTeacherStudentsByIdRequest(students)),
    clearAllStudents: data => dispatch(loadAllStudents(data)),
    clearClassesStudents: data => dispatch(setClassesStudents(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDataStudents)
