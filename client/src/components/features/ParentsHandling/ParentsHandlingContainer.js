import {connect} from 'react-redux';
import ParentsHandling from './ParentsHandling';
import {loadParentsRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import {getParents} from "../../../redux/actions/usersActions";

const mapDispatchToProps = dispatch => ({
    loadParents: () => dispatch(loadParentsRequest())
});

const mapStateToProps = state => ({
    request: getRequest(state),
    parents: getParents(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentsHandling);
