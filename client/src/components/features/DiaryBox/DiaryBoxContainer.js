import {connect} from 'react-redux';
import DiaryBox from './DiaryBox';
import {getRequest} from "../../../redux/actions/requestActions";
import {getUser} from "../../../redux/actions/usersActions";
import {getSelectedClass} from "../../../redux/actions/classActions";

const mapStateToProps = state => ({
    request: getRequest(state),
    selectedClass: getSelectedClass(state),
    teacher: getUser(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryBox);
