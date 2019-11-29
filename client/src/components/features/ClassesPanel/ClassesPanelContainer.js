import {connect} from 'react-redux';
import ClassesPanel from './ClassesPanel';
import {getAllClasses} from "../../../redux/actions/classActions";

const mapStateToProps = state => ({
   allClasses: getAllClasses(state)
});

export default connect(mapStateToProps)(ClassesPanel);
