import {connect} from 'react-redux';
import ParentItemCollapse from "./ParentItemCollapse";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {updateUserRequest, updateStudentRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    allStudents: getAllStudents(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(updateUserRequest(user)),
    updateStudent: student => dispatch(updateStudentRequest(student))
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentItemCollapse);
