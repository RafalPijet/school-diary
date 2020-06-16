import {connect} from 'react-redux';
import {getUser} from "../../../redux/actions/usersActions";
import {getRequest} from "../../../redux/actions/requestActions";
import {updateUserRequest} from "../../../redux/thunks";
import EditUserData from "./EditUserData";

const mapStateToProps = state => ({
   request: getRequest(state),
   user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
   updateUser: (isPassword, isDataChange, userAfterChange) =>
       dispatch(updateUserRequest((isPassword, isDataChange, userAfterChange)))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserData)
