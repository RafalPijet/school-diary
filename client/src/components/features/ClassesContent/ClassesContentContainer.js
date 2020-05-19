import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getAllStudents, getClassesStudents} from "../../../redux/actions/studentActions";
import {getStudentsByIdRequest} from "../../../redux/thunks";
import ClassesContent from './ClassesContent'

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    allStudents: getAllStudents(state),
    request: getRequest(state),
    classesStudents: getClassesStudents(state)
});

const mapDispatchToProps = dispatch => ({
    getStudentsById: studentsId => dispatch(getStudentsByIdRequest(studentsId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContent);
