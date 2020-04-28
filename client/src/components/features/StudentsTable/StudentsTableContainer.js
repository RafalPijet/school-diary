import {connect} from 'react-redux';
import StudentsTable from "./StudentsTable";
import {getAllStudents} from "../../../redux/actions/studentActions";

const mapStateToProps = state => ({
    students: getAllStudents(state)
});

export default connect(mapStateToProps)(StudentsTable);
