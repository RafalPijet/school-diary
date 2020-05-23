import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getAllClasses, getSelectedClass, setSelectedClass} from "../../../redux/actions/classActions";
import {getTeachers} from "../../../redux/actions/usersActions";
import {getIsStudentMode, setIsStudentMode} from "../../../redux/actions/valuesActions";
import {getAllStudents, getClassesStudents, setFreeStudents} from "../../../redux/actions/studentActions";
import {getStudentsByIdRequest, loadDataForClassByIdRequest} from "../../../redux/thunks";
import ClassesContent from './ClassesContent'

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    allStudents: getAllStudents(state),
    request: getRequest(state),
    classesStudents: getClassesStudents(state),
    isStudentMode: getIsStudentMode(state),
    selectedClass: getSelectedClass(state),
    teachers: getTeachers(state)
});

const mapDispatchToProps = dispatch => ({
    getStudentsById: studentsId => dispatch(getStudentsByIdRequest(studentsId)),
    setFreeStudents: students => dispatch(setFreeStudents(students)),
    setSelectedClass: classItem => dispatch(setSelectedClass(classItem)),
    loadDataForClass: id => dispatch(loadDataForClassByIdRequest(id)),
    setIsStudentMode: isStudentMode => dispatch(setIsStudentMode(isStudentMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContent);
