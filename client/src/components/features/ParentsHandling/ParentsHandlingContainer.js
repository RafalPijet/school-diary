import {connect} from 'react-redux';
import ParentsHandling from './ParentsHandling';
import {
    loadParentsRequestWithRange,
    loadParentByIdRequest,
    getAllStudentsRequest,
    getUsersNameRequest
} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAllStudents, loadAllStudents} from "../../../redux/actions/studentActions";
import {getParents, loadParents, getUsersName, loadUsersName} from "../../../redux/actions/usersActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";

const mapDispatchToProps = dispatch => ({
    loadParents: (page, itemsPerPage) => dispatch(loadParentsRequestWithRange(page, itemsPerPage)),
    loadParent: id => dispatch(loadParentByIdRequest(id)),
    loadStudents: () => dispatch(getAllStudentsRequest()),
    loadParentName: status => dispatch(getUsersNameRequest(status)),
    resetRequest: () => dispatch(resetRequest()),
    clearParents: data => dispatch(loadParents(data)),
    clearStudents: data => dispatch(loadAllStudents(data)),
    clearParentsName: data => dispatch(loadUsersName(data)),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    parents: getParents(state),
    allStudents: getAllStudents(state),
    alertSuccess: getAlertSuccess(state),
    parentsName: getUsersName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsHandling);
