import {connect} from 'react-redux';
import {getTeachers} from "../../../redux/actions/usersActions";
import {getRequest} from "../../../redux/actions/requestActions";
import {getSubjects} from "../../../redux/actions/valuesActions";
import {updateClassRequest} from "../../../redux/thunks";
import ClassContent from "./ClassContent";

const mapStateToProps = state => ({
    teachers: getTeachers(state),
    request: getRequest(state),
    availableSubjects: getSubjects(state)
});

const mapDispatchToProps = dispatch => ({
    updateClass: classItem => dispatch(updateClassRequest(classItem))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassContent);
