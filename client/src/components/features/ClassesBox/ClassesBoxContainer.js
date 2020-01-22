import {connect} from 'react-redux';
import ClassesBox from './ClassesBox';
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getSubjects} from "../../../redux/actions/valuesActions";
import {
    loadAllClassesRequest,
    getAllStudentsRequest,
    addStudentToClassRequest,
    addTeacherToClassRequest
} from "../../../redux/thunks";

const mapDispatchToProps = dispatch => ({
    loadAllClasses: () => dispatch(loadAllClassesRequest()),
    loadAllStudents: () => dispatch(getAllStudentsRequest()),
    addStudent: payload => dispatch(addStudentToClassRequest(payload)),
    addTeacher: payload => dispatch(addTeacherToClassRequest(payload)),
    resetRequest: () => dispatch(resetRequest())
});

const mapStateToProps = state => ({
    request: getRequest(state),
    allClasses: getAllClasses(state),
    subjects: getSubjects(state)
});


export default connect(mapStateToProps, mapDispatchToProps)(ClassesBox);
