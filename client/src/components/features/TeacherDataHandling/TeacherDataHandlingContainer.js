import {connect} from 'react-redux';
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";
import TeacherDataHandling from "./TeacherDataHandling";

const mapStateToProps = state => ({
   request: getRequest(state),
   alertSuccess: getAlertSuccess(state)
});

const mapDispatchToProps = dispatch => ({
   resetRequest: () => dispatch(resetRequest()),
   setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDataHandling)
