import {connect} from 'react-redux';
import {addSubjectRating} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import DiaryList from "./DiaryList";

const mapStateToProps = state => ({
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    addSubjectRating: (student, subject) => dispatch(addSubjectRating(student, subject))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryList);
