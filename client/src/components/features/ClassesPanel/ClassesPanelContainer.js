import {connect} from 'react-redux';
import ClassesPanel from './ClassesPanel';
import {getAllClasses} from "../../../redux/actions/classActions";
import {loadTeachersRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeachers: () => dispatch(loadTeachersRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesPanel);
