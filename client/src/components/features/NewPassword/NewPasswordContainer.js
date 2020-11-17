import { connect } from 'react-redux';
import { getRequest, resetRequest } from '../../../redux//actions/requestActions';
import { changePasswordRequest } from '../../../redux/thunks';
import NewPassword from './NewPassword';

const mapStateToProps = state => ({
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    changePassword: (token, data) => dispatch(changePasswordRequest(token, data)),
    resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
