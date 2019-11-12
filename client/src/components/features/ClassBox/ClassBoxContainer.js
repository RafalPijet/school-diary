import {connect} from 'react-redux';
import {getSelectedClass, setSelectedClass} from "../../../redux/actions/classActions";
import ClassBox from './ClassBox';

const mapStateToProps = state => ({
    selectedClass: getSelectedClass(state)
});

const mapDispatchToProps = dispatch => ({
    setSelectedClass: diary => dispatch(setSelectedClass(diary))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassBox);
