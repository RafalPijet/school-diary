import {connect} from 'react-redux';
import {getAllStudentsRequest, getStudentsWithRangeRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {getAlertSuccess, setAlertSuccess} from "../../../redux/actions/valuesActions";
import StudentsHandling from "./StudentsHandling";

const mapDispatchToProps = dispatch => ({
    resetRequest: () => dispatch(resetRequest()),
    loadAllStudents: () => dispatch(getAllStudentsRequest()),
    loadStudentsWithRange: (page, itemsPerPage) => dispatch(getStudentsWithRangeRequest(page, itemsPerPage)),
    setAlertSuccess: (isOpen, message) => dispatch(setAlertSuccess(isOpen, message))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    alertSuccess: getAlertSuccess(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsHandling)
