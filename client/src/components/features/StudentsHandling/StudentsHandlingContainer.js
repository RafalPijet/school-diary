import {connect} from 'react-redux';
import {getAllStudentsRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import StudentsHandling from "./StudentsHandling";

const mapDispatchToProps = dispatch => ({
    resetRequest: () => dispatch(resetRequest()),
    loadAllStudents: () => dispatch(getAllStudentsRequest())
});

const mapStateToProps = state => ({
    request: getRequest(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsHandling)
