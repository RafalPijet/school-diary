import {connect} from 'react-redux';
import ParentsHandling from './ParentsHandling';
import {loadParentsRequest, loadAllClassesRequest, getAllStudentsRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getParents} from "../../../redux/actions/usersActions";

const mapDispatchToProps = dispatch => ({
    loadParents: () => dispatch(loadParentsRequest()),
    loadClasses: () => dispatch(loadAllClassesRequest()),
    loadStudents: () => dispatch(getAllStudentsRequest()),
    resetRequest: () => dispatch(resetRequest())
});

const mapStateToProps = state => ({
    request: getRequest(state),
    parents: getParents(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsHandling);
