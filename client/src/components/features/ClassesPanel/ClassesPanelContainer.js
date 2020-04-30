import {connect} from 'react-redux';
import ClassesPanel from './ClassesPanel';
import {getAllClasses} from "../../../redux/actions/classActions";
import {loadTeachersRequest, addClassRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import {getTeachers} from "../../../redux/actions/usersActions";

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    request: getRequest(state),
    teachers: getTeachers(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeachers: () => dispatch(loadTeachersRequest()),
    addClass: payload => dispatch(addClassRequest(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesPanel);
