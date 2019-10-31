import {connect} from 'react-redux';
import {loadUserByLogin} from "../../../redux/thunks";
import UserForm from './UserForm';

const mapDispatchToProps = dispatch => ({
    loadUser: login => dispatch(loadUserByLogin(login))
});

export default connect(null, mapDispatchToProps)(UserForm);
