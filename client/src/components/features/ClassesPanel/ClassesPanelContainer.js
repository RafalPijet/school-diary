import {connect} from 'react-redux';
import ClassesPanel from './ClassesPanel';
import {getAllClasses, getAvailableNames} from "../../../redux/actions/classActions";
import {loadTeachersRequest, addClassRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import {getTeachers} from "../../../redux/actions/usersActions";
import {getTutorIsUse, setTutorIsUse} from "../../../redux/actions/valuesActions";

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    request: getRequest(state),
    teachers: getTeachers(state),
    availableNames: getAvailableNames(state),
    tutorIsUse: getTutorIsUse(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeachers: () => dispatch(loadTeachersRequest()),
    addClass: payload => dispatch(addClassRequest(payload)),
    setTutorIsUse: isUse => dispatch(setTutorIsUse(isUse))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesPanel);
