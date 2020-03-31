import {connect} from 'react-redux';
import LoggedUser from "./LoggedUser";
import {getUser, getLogin} from "../../../redux/actions/usersActions";
import {setIsDark} from "../../../redux/actions/valuesActions";

const mapStateToProps = state => ({
   user: getUser(state),
   isLogin: getLogin(state)
});

const mapDispatchToProps = dispatch => ({
   setIsDark: isDark => dispatch(setIsDark(isDark))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUser);
