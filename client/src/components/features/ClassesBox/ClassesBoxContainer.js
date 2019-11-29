import {connect} from 'react-redux';
import ClassesBox from './ClassesBox';
import {getRequest} from "../../../redux/actions/requestActions";
import {getAllClasses} from "../../../redux/actions/classActions";
import {loadAllClassesRequest} from "../../../redux/thunks";

const mapDispatchToProps = dispatch => ({
   loadAllClasses: () => dispatch(loadAllClassesRequest())
});

const mapStateToProps = state => ({
    request: getRequest(state),
    allClasses: getAllClasses(state)
});


export default connect(mapStateToProps, mapDispatchToProps)(ClassesBox);
