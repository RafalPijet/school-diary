import {connect} from 'react-redux';
import ParentsHandling from './ParentsHandling';
import {loadParentsRequest, getAllStudentsRequest, getParentsNameRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAllStudents, loadAllStudents} from "../../../redux/actions/studentActions";
import {getParents, loadParents, getParentsName, loadParentsName} from "../../../redux/actions/usersActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";

const mapDispatchToProps = dispatch => ({
    loadParents: () => dispatch(loadParentsRequest()),
    loadStudents: () => dispatch(getAllStudentsRequest()),
    loadParentName: () => dispatch(getParentsNameRequest()),
    resetRequest: () => dispatch(resetRequest()),
    clearParents: data => dispatch(loadParents(data)),
    clearStudents: data => dispatch(loadAllStudents(data)),
    clearParentsName: data => dispatch(loadParentsName(data)),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    parents: getParents(state),
    allStudents: getAllStudents(state),
    alertSuccess: getAlertSuccess(state),
    parentsName: getParentsName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsHandling);
