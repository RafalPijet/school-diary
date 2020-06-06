import {connect} from 'react-redux';
import ParentsHandling from './ParentsHandling';
import {loadParentsRequest, getAllStudentsRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAllStudents, loadAllStudents} from "../../../redux/actions/studentActions";
import {getParents, loadParents} from "../../../redux/actions/usersActions";

const mapDispatchToProps = dispatch => ({
    loadParents: () => dispatch(loadParentsRequest()),
    loadStudents: () => dispatch(getAllStudentsRequest()),
    resetRequest: () => dispatch(resetRequest()),
    clearParents: data => dispatch(loadParents(data)),
    clearStudents: data => dispatch(loadAllStudents(data))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    parents: getParents(state),
    allStudents: getAllStudents(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsHandling);
