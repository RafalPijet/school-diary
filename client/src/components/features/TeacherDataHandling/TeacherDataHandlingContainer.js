import {connect} from 'react-redux';
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";
import {getTeacherAllClass} from "../../../redux/actions/classActions";
import {getUserId} from "../../../redux/actions/usersActions";
import {loadAllClassByTeacherId} from "../../../redux/thunks";
import TeacherDataHandling from "./TeacherDataHandling";

const mapStateToProps = state => ({
   request: getRequest(state),
   alertSuccess: getAlertSuccess(state),
   teacherAllClass: getTeacherAllClass(state),
   userId: getUserId(state)
});

const mapDispatchToProps = dispatch => ({
   resetRequest: () => dispatch(resetRequest()),
   setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message)),
   loadAllClasses: teacherId => dispatch(loadAllClassByTeacherId(teacherId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDataHandling)
