import {connect} from 'react-redux';
import {addStudentRequest} from "../../../redux/thunks";
import {getRequest, resetRequest, errorRequest} from "../../../redux/actions/requestActions";
import StudentsHandling from "./StudentsHandling";

const mapDispatchToProps = dispatch => ({
    addStudent: student => dispatch(addStudentRequest(student)),
    resetRequest: () => dispatch(resetRequest()),
    errorRequest: error => dispatch(errorRequest(error))
});

const mapStateToProps = state => ({
    request: getRequest(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsHandling)