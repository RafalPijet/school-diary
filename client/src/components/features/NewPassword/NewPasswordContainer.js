import {connect} from 'react-redux';
import {getRequest} from '../../../redux//actions/requestActions';
import NewPassword from './NewPassword';

const mapStateToProps = state => ({
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
