import {connect} from 'react-redux';
import {loadUserByLogin, addUser} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import {resetRequest} from "../../../redux/actions/requestActions";
import {getSubjects} from "../../../redux/actions/valuesActions";
import {setRegister, getRegister} from "../../../redux/actions/usersActions";
import UserForm from './UserForm';

const mapDispatchToProps = dispatch => ({
    loadUser: login => dispatch(loadUserByLogin(login)),
    addUser: user => dispatch(addUser(user)),
    resetRequest: () => dispatch(resetRequest()),
    setRegisterAfter: login => dispatch(setRegister(login))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    subjects: getSubjects(state),
    registerAfter: getRegister(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
