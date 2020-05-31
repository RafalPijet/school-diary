import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {getStudentsWithRangeRequest, getStudentsNamesRequest,deleteStudentRequest} from "../../../redux/thunks";
import {getAllStudents, getFreeStudents} from "../../../redux/actions/studentActions";
import {getModalYesNot, setModalYesNot} from "../../../redux/actions/valuesActions";
import StudentsTable from "./StudentsTable";

const mapStateToProps = state => ({
    selectedStudents: getAllStudents(state),
    allStudents: getFreeStudents(state),
    request: getRequest(state),
    modalYesNot: getModalYesNot(state)
});

const mapDispatchToProps = dispatch => ({
    loadStudentsWithRange: (page, itemsPerPage) => dispatch(getStudentsWithRangeRequest(page, itemsPerPage)),
    loadStudentsNames: () => dispatch(getStudentsNamesRequest()),
    setModalYesNot: (isOpen, content) => dispatch(setModalYesNot(isOpen, content)),
    deleteStudent: studentId => dispatch(deleteStudentRequest(studentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable);
