import {connect} from 'react-redux';
import {getAllClasses} from "../../../redux/actions/classActions";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {getAllStudentsRequest} from "../../../redux/thunks";
import ClassesContent from './ClassesContent'

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    allStudents: getAllStudents(state)
});

const mapDispatchToProps = dispatch => ({
    loadAllStudents: () => dispatch(getAllStudentsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContent);
