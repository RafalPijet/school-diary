import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getTeacherAllClass} from "../../../redux/actions/classActions";
import {getTeacherStudentsNameRequest} from "../../../redux/thunks";
import {getAllStudents} from "../../../redux/actions/studentActions";
import TeacherDataStudents from "./TeacherDataStudents";

const mapStateToProps = state => ({
    request: getRequest(state),
    teacherAllClass: getTeacherAllClass(state),
    allStudents: getAllStudents(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeacherStudentsName: classesId => dispatch(getTeacherStudentsNameRequest(classesId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDataStudents)
