import {connect} from 'react-redux';
import {getTeacherAllClass, getSelectedClass, setSelectedClass} from "../../../redux/actions/classActions";
import {getUser} from "../../../redux/actions/usersActions";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import {loadAllClassByTeacherId, deleteRatingForStudent, loadClassById} from "../../../redux/thunks";
import {getModalYesNot, setModalYesNot} from "../../../redux/actions/valuesActions";
import ClassBoxList from "./ClassBoxList";

const mapStateToProps = state => ({
    availableClasses: getTeacherAllClass(state),
    selectedClass: getSelectedClass(state),
    user: getUser(state),
    request: getRequest(state),
    modalYesNot: getModalYesNot(state)
});

const mapDispatchToProps = dispatch => ({
    setSelectedClass: classItem => dispatch(setSelectedClass(classItem)),
    loadClassById: id => dispatch(loadClassById(id)),
    loadClasses: teacherId => dispatch(loadAllClassByTeacherId(teacherId)),
    resetRequest: () => dispatch(resetRequest()),
    setModalYesNot: (isOpen, content) => dispatch(setModalYesNot(isOpen, content)),
    deleteRating: (id, _id, classId, studentId) => dispatch(deleteRatingForStudent(id, _id, classId, studentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassBoxList)
