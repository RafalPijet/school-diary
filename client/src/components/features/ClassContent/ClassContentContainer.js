import {connect} from 'react-redux';
import {getTeachers} from "../../../redux/actions/usersActions";
import {getRequest} from "../../../redux/actions/requestActions";
import {getSubjects, setIsStudentMode} from "../../../redux/actions/valuesActions";
import {getFreeStudents} from "../../../redux/actions/studentActions";
import {updateClassRequest} from "../../../redux/thunks";
import ClassContent from "./ClassContent";

const mapStateToProps = state => ({
    teachers: getTeachers(state),
    request: getRequest(state),
    availableSubjects: getSubjects(state),
    freeStudents: getFreeStudents(state)
});

const mapDispatchToProps = dispatch => ({
    updateClass: classItem => dispatch(updateClassRequest(classItem)),
    studentMode: isStudentMode => dispatch(setIsStudentMode(isStudentMode))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassContent);
