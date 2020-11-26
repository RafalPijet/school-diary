import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getAllClasses, getSelectedClass, setSelectedClass} from "../../../redux/actions/classActions";
import {getTeachers} from "../../../redux/actions/usersActions";
import {getIsStudentMode, setIsStudentMode, getModalYesNot, setModalYesNot, getAddingIsDone, setAddingIsDone} from "../../../redux/actions/valuesActions";
import {getAllStudents, getClassesStudents, setFreeStudents} from "../../../redux/actions/studentActions";
import {getStudentsByIdRequest, loadDataForClassByIdRequest, deleteClassByIdRequest} from "../../../redux/thunks";
import ClassesContent from './ClassesContent'

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    allStudents: getAllStudents(state),
    request: getRequest(state),
    classesStudents: getClassesStudents(state),
    isStudentMode: getIsStudentMode(state),
    selectedClass: getSelectedClass(state),
    teachers: getTeachers(state),
    modalYesNot: getModalYesNot(state),
    addingIsDone: getAddingIsDone(state)
});

const mapDispatchToProps = dispatch => ({
    getStudentsById: studentsId => dispatch(getStudentsByIdRequest(studentsId)),
    setFreeStudents: students => dispatch(setFreeStudents(students)),
    setSelectedClass: classItem => dispatch(setSelectedClass(classItem)),
    loadDataForClass: id => dispatch(loadDataForClassByIdRequest(id)),
    setIsStudentMode: isStudentMode => dispatch(setIsStudentMode(isStudentMode)),
    deleteClass: id => dispatch(deleteClassByIdRequest(id)),
    setModalYesNot: (isOpen, content) => dispatch(setModalYesNot(isOpen, content)),
    setAddingIsDone: isDone => dispatch(setAddingIsDone(isDone))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContent);
