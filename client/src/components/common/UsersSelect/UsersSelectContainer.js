import {connect} from 'react-redux';
import UsersSelect from './UsersSelect';
import {getRequest} from "../../../redux/actions/requestActions";
import {getAllStudents} from "../../../redux/actions/studentActions";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getTeachers} from "../../../redux/actions/usersActions";

const mapStateToProps = state => ({
    request: getRequest(state),
    students: getAllStudents(state),
    classes: getAllClasses(state),
    teachers: getTeachers(state)
});

export default connect(mapStateToProps)(UsersSelect);


