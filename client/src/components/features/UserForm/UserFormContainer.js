import {connect} from 'react-redux';
import {loadUserByLogin} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import UserForm from './UserForm';

const mapDispatchToProps = dispatch => ({
    loadUser: login => dispatch(loadUserByLogin(login))
});

const mapStateToProps = state => ({
    request: getRequest(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
