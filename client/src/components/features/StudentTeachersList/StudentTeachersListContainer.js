import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getUser} from "../../../redux/actions/usersActions";
import {getSelectedClass, setSelectedClass} from "../../../redux/actions/classActions";
import {getClassNameForStudentByIdRequest, getTeachersByClassNameRequest} from "../../../redux/thunks";
import StudentTeachersList from "./StudentTeachersList";

const mapStateToProps = state => ({
    request: getRequest(state),
    user: getUser(state),
    selectedClass: getSelectedClass(state)
});

const mapDispatchToProps = dispatch => ({
    getClassesName: studentsId => dispatch(getClassNameForStudentByIdRequest(studentsId)),
    loadTeachers: name => dispatch(getTeachersByClassNameRequest(name)),
    clearSelectedClass: classItem => dispatch(setSelectedClass(classItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentTeachersList)
