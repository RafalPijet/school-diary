import {connect} from 'react-redux';
import ParentItemCollapse from "./ParentItemCollapse";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {updateUserRequest, updateStudentRequest, deleteParentRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";

const mapStateToProps = state => ({
    allStudents: getAllStudents(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    updateUser: (id, studentsList, data) => dispatch(updateUserRequest(id, studentsList, data)),
    updateStudent: (id, parent, isAdd) => dispatch(updateStudentRequest(id, parent, isAdd)),
    deleteParent: id => dispatch(deleteParentRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentItemCollapse);
