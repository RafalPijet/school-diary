import {connect} from 'react-redux';
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";
import StudentsHandling from "./StudentsHandling";

const mapDispatchToProps = dispatch => ({
    resetRequest: () => dispatch(resetRequest()),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    alertSuccess: getAlertSuccess(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsHandling)
