import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getUser} from "../../../redux/actions/usersActions";
import {getClassNameForStudentByIdRequest} from "../../../redux/thunks";
import ParentData from "./ParentData";

const mapStateToProps = state => ({
    request: getRequest(state),
    user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
    getClassesName: studentsId => dispatch(getClassNameForStudentByIdRequest(studentsId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentData);
