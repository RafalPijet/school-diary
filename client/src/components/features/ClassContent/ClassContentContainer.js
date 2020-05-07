import {connect} from 'react-redux';
import {getAllStudents} from "../../../redux/actions/studentActions";
import {getTeachers} from "../../../redux/actions/usersActions";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getSubjects} from "../../../redux/actions/valuesActions";
import ClassContent from "./ClassContent";

const mapStateToProps = state => ({
    allStudents: getAllStudents(state),
    teachers: getTeachers(state),
    request: getRequest(state),
    availableSubjects: getSubjects(state)
});

const mapDispatchToProps = dispatch => ({
    resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassContent);
