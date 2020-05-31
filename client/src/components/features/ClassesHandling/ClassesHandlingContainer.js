import {connect} from 'react-redux';
import ClassesHandling from "./ClassesHandling";
import {
    loadAllClasses,
    getAllClasses,
    setSelectedClass
} from "../../../redux/actions/classActions";
import {
    loadAllStudents,
    setFreeStudents,
    setClassesStudents
} from "../../../redux/actions/studentActions";
import {
    loadAllClassesRequest,
    getStudentsIdRequest,
    loadStudentsIdFromClasses
} from "../../../redux/thunks";
import {
    getRequest,
    resetRequest
} from "../../../redux/actions/requestActions";
import {
    setAlertSuccess,
    getAlertSuccess,
    setIsStudentMode,
    setTutorIsUse
} from "../../../redux/actions/valuesActions";
import {loadTeachers} from "../../../redux/actions/usersActions";

const mapStateToProps = state => ({
    request: getRequest(state),
    alertSuccess: getAlertSuccess(state),
    allClasses: getAllClasses(state)
});

const mapDispatchToProps = dispatch => ({
    clearAllClasses: data => dispatch(loadAllClasses(data)),
    clearAllStudents: data => dispatch(loadAllStudents(data)),
    clearFreeStudents: data => dispatch(setFreeStudents(data)),
    clearClassesStudents: data => dispatch(setClassesStudents(data)),
    clearSelectedClass: data => dispatch(setSelectedClass(data)),
    clearTeachers: data => dispatch(loadTeachers(data)),
    setIsStudentMode: isStudentMode => dispatch(setIsStudentMode(isStudentMode)),
    setTutorIsUse: tutorIsUse => dispatch(setTutorIsUse(tutorIsUse)),
    loadAllClasses: () => dispatch(loadAllClassesRequest()),
    loadAllStudents: () => dispatch(getStudentsIdRequest()),
    loadStudentsIdFromClasses: () => dispatch(loadStudentsIdFromClasses()),
    resetRequest: () => dispatch(resetRequest()),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesHandling)
