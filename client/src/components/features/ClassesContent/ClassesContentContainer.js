import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {getAllStudentsRequest, getStudentsById} from "../../../redux/thunks";
import ClassesContent from './ClassesContent'

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    allStudents: getAllStudents(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    loadAllStudents: () => dispatch(getAllStudentsRequest()),
    getStudentsById: studentsId => dispatch(getStudentsById(studentsId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContent);
