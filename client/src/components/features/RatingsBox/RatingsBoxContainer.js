import {connect} from 'react-redux';
import RatingBox from './RatingsBox';
import {getUser} from "../../../redux/actions/usersActions";

const mapStateToProps = state => ({
   user: getUser(state)
});

export default connect(mapStateToProps)(RatingBox)
