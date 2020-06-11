import {connect} from 'react-redux'
import {
    getUsersNameRequest,
    loadTeachersRequestWithRange,
    loadTeacherByIdRequest
} from "../../../redux/thunks";
import {getUsersName, getTeachers} from "../../../redux/actions/usersActions";
import {getRequest} from "../../../redux/actions/requestActions";
import TeachersHandling from "./TeachersHandling";

const mapStateToProps = state => ({
    teachers: getTeachers(state),
    teachersName: getUsersName(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeachersName: status => dispatch(getUsersNameRequest(status)),
    loadTeachers: (page, itemsPerPage) => dispatch(loadTeachersRequestWithRange(page, itemsPerPage)),
    loadTeacher: id => dispatch(loadTeacherByIdRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeachersHandling);
