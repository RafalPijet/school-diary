import {connect} from 'react-redux';
import ParentItemCollapse from "./ParentItemCollapse";
import {getAllClasses} from "../../../redux/actions/classActions";
import {getAllStudents} from "../../../redux/actions/studentActions";

const mapStateToProps = state => ({
    allClasses: getAllClasses(state),
    allStudents: getAllStudents(state)
});

export default connect(mapStateToProps)(ParentItemCollapse)
