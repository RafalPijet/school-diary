import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {setModalYesNot} from "../../../redux/actions/valuesActions";
import {updateStudentBasicDataRequest} from "../../../redux/thunks";
import {getMaxBirthDate} from "../../../redux/actions/valuesActions";
import StudentItem from "./StudentItem";

const mapStateToProps = state => ({
    request: getRequest(state),
    maxBirthDate: getMaxBirthDate(state)
});

const mapDispatchToProps = dispatch => ({
    setModalYesNot: (isOpen, content) => dispatch(setModalYesNot(isOpen, content)),
    updateStudent: student => dispatch(updateStudentBasicDataRequest(student))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentItem);
