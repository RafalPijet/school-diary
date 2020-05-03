import {connect} from 'react-redux';
import ClassesHandling from "./ClassesHandling";
import {loadAllClassesRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {setAlertSuccess, getAlertSuccess} from "../../../redux/actions/valuesActions";

const mapStateToProps = state => ({
   request: getRequest(state),
   alertSuccess: getAlertSuccess(state)
});

const mapDispatchToProps = dispatch => ({
   loadAllClasses: () => dispatch(loadAllClassesRequest()),
   resetRequest: () => dispatch(resetRequest()),
   setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesHandling)
