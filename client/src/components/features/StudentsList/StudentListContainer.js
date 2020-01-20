import {connect} from 'react-redux';
import StudentsList from "./StudentsList";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getRequest} from "../../../redux/actions/requestActions";
import {loadAllClassesRequest, getAllStudentsRequest, updateStudentRequest} from "../../../redux/thunks";

const mapStateToProps = state => ({
    students: getAllStudents(state),
    classes: getAllClasses(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    loadStudents: () => dispatch(getAllStudentsRequest()),
    loadClasses: () => dispatch(loadAllClassesRequest()),
    updateStudent: student => dispatch(updateStudentRequest(student))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
