import {connect} from 'react-redux';
import {getUser} from "../../../redux/actions/usersActions";
import {getClassNameForStudentByIdRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import RatingBox from './RatingsBox';

const mapStateToProps = state => ({
   user: getUser(state),
   request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
   getClassesName: studentsId => dispatch(getClassNameForStudentByIdRequest(studentsId))
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingBox)
