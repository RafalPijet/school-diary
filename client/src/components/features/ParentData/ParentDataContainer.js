import {connect} from 'react-redux';
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getUser} from "../../../redux/actions/usersActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";
import {getClassNameForStudentByIdRequest} from "../../../redux/thunks";
import ParentData from "./ParentData";

const mapStateToProps = state => ({
    request: getRequest(state),
    user: getUser(state),
    alertSuccess: getAlertSuccess(state)
});

const mapDispatchToProps = dispatch => ({
    getClassesName: studentsId => dispatch(getClassNameForStudentByIdRequest(studentsId)),
    resetRequest: () => dispatch(resetRequest()),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentData);
