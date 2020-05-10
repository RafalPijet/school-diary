import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {updateTutorClassRequest} from "../../../redux/thunks";
import NavClassPanel from "./NavClassPanel";

const mapStateToProps = state => ({
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    updateTutor: classItem => dispatch(updateTutorClassRequest(classItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavClassPanel)
