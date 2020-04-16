import {connect} from 'react-redux';
import {getTeacherAllClass} from "../../../redux/actions/classActions";
import {getUser} from "../../../redux/actions/usersActions";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {loadAllClassByTeacherId} from "../../../redux/thunks";
import ClassBoxList from "./ClassBoxList";

const mapStateToProps = state => ({
    availableClasses: getTeacherAllClass(state),
    user: getUser(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    loadClasses: teacherId => dispatch(loadAllClassByTeacherId(teacherId)),
    resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassBoxList)
