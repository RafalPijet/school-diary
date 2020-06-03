import {connect} from 'react-redux';
import ParentsHandling from './ParentsHandling';
import {loadParentsRequest, getAllStudentsRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {getParents} from "../../../redux/actions/usersActions";

const mapDispatchToProps = dispatch => ({
    loadParents: () => dispatch(loadParentsRequest()),
    loadStudents: () => dispatch(getAllStudentsRequest()),
    resetRequest: () => dispatch(resetRequest())
});

const mapStateToProps = state => ({
    request: getRequest(state),
    parents: getParents(state),
    allStudents: getAllStudents(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsHandling);
