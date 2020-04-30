import {connect} from 'react-redux';
import ClassesHandling from "./ClassesHandling";
import {loadAllClassesRequest} from "../../../redux/thunks";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";

const mapStateToProps = state => ({
   request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
   loadAllClasses: () => dispatch(loadAllClassesRequest()),
   resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesHandling)
