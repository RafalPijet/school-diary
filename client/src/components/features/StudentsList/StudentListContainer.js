import {connect} from 'react-redux';
import StudentsList from "./StudentsList";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {
    loadAllClassesRequest,
    getAllStudentsRequest,
    updateStudentRequest,
    deleteStudentRequest,
    updateUserRequest,
    deleteRatingRequest
} from "../../../redux/thunks";

const mapStateToProps = state => ({
    students: getAllStudents(state),
    classes: getAllClasses(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    loadStudents: () => dispatch(getAllStudentsRequest()),
    loadClasses: () => dispatch(loadAllClassesRequest()),
    updateStudent: student => dispatch(updateStudentRequest(student)),
    resetRequest: () => dispatch(resetRequest()),
    deleteStudent: student => dispatch(deleteStudentRequest(student)),
    updateUser: user => dispatch(updateUserRequest(user)),
    deleteRating: id => dispatch(deleteRatingRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);
