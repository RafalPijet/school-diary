import {connect} from 'react-redux';
import {getLogin, getUserStatus} from "../../../redux/actions/usersActions";
import {getPath} from "../../../redux/actions/valuesActions";
import Footer from "./Footer";

const mapStateToProps = state => ({
   isLogin: getLogin(state),
   path: getPath(state),
   userStatus: getUserStatus(state)
});

export default connect(mapStateToProps)(Footer);
