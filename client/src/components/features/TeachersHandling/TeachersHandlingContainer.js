import {connect} from 'react-redux'
import {getUsersNameRequest, loadTeachersRequestWithRange} from "../../../redux/thunks";
import {getUsersName} from "../../../redux/actions/usersActions";
import {getRequest} from "../../../redux/actions/requestActions";
import TeachersHandling from "./TeachersHandling";

const mapStateToProps = state => ({
    teachersName: getUsersName(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    loadTeachersName: status => dispatch(getUsersNameRequest(status)),
    loadTeachers: (page, itemsPerPage) => dispatch(loadTeachersRequestWithRange(page, itemsPerPage))
});

export default connect(mapStateToProps, mapDispatchToProps)(TeachersHandling);
