import {connect} from 'react-redux'
import {
    getUsersNameRequest,
    loadTeachersRequestWithRange,
    loadTeacherByIdRequest,
    deleteTeacherRequest,
} from "../../../redux/thunks";
import {
    getUsersName,
    getTeachers,
    loadTeachers,
    loadUsersName
} from "../../../redux/actions/usersActions";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {
    getModalYesNot,
    setModalYesNot,
    getAlertSuccess,
    setAlertSuccess
} from "../../../redux/actions/valuesActions";
import TeachersHandling from "./TeachersHandling";

const mapStateToProps = state => ({
    teachers: getTeachers(state),
    teachersName: getUsersName(state),
    request: getRequest(state),
    modalYesNot: getModalYesNot(state),
    alertSuccess: getAlertSuccess(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeachersName: status => dispatch(getUsersNameRequest(status)),
    loadTeachers: (page, itemsPerPage) => dispatch(loadTeachersRequestWithRange(page, itemsPerPage)),
    loadTeacher: id => dispatch(loadTeacherByIdRequest(id)),
    resetRequest: () => dispatch(resetRequest()),
    setModalYesNot: (isOpen, content) => dispatch(setModalYesNot(isOpen, content)),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message)),
    deleteTeacher: (id, page, rowsPerPage) => dispatch(deleteTeacherRequest(id, page, rowsPerPage)),
    clearTeachers: data => dispatch(loadTeachers(data)),
    clearTeachersName: data => dispatch(loadUsersName(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeachersHandling);
