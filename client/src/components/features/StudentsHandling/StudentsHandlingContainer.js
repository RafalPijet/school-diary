import {connect} from 'react-redux';
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";
import {
    getAllStudents,
    getFreeStudents,
    setFreeStudents,
    loadAllStudents
} from "../../../redux/actions/studentActions";
import StudentsHandling from "./StudentsHandling";

const mapDispatchToProps = dispatch => ({
    resetRequest: () => dispatch(resetRequest()),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message)),
    clearAllStudents: students => dispatch(loadAllStudents(students)),
    clearFreeStudents: students => dispatch(setFreeStudents(students))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    alertSuccess: getAlertSuccess(state),
    allStudents: getAllStudents(state),
    freeStudents: getFreeStudents(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsHandling)
