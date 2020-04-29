import {connect} from 'react-redux';
import StudentForm from "./StudentForm";
import {addStudentRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import {getMaxBirthDate, setAlertSuccess} from "../../../redux/actions/valuesActions";
import {getStudentsAmount} from "../../../redux/actions/studentActions";

const mapStateToProps = state => ({
   request: getRequest(state),
   maxBirthDate: getMaxBirthDate(state),
   studentsAmount: getStudentsAmount(state)
});

const mapDispatchToProps = dispatch => ({
   addStudent: student => dispatch(addStudentRequest(student)),
   alertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
