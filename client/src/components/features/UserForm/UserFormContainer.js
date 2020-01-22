import {connect} from 'react-redux';
import {loadUserByLogin, addUser} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import {resetRequest, errorRequest} from "../../../redux/actions/requestActions";
import {getSubjects} from "../../../redux/actions/valuesActions";
import UserForm from './UserForm';

const mapDispatchToProps = dispatch => ({
    loadUser: login => dispatch(loadUserByLogin(login)),
    addUser: user => dispatch(addUser(user)),
    resetRequest: () => dispatch(resetRequest()),
    errorRequest: error => dispatch(errorRequest(error))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    subjects: getSubjects(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
