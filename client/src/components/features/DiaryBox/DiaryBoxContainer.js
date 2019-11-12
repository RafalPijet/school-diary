import {connect} from 'react-redux';
import DiaryBox from './DiaryBox';
import {getRequest} from "../../../redux/actions/requestActions";
import {getSelectedClass} from "../../../redux/actions/classActions";

const mapStateToProps = state => ({
    request: getRequest(state),
    selectedClass: getSelectedClass(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryBox);
