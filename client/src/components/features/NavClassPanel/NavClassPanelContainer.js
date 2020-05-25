import {connect} from 'react-redux';
import {setModalYesNot} from "../../../redux/actions/valuesActions";
import {getRequest} from "../../../redux/actions/requestActions";
import {updateTutorClassRequest} from "../../../redux/thunks";
import NavClassPanel from "./NavClassPanel";

const mapStateToProps = state => ({
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    updateTutor: classItem => dispatch(updateTutorClassRequest(classItem)),
    setModalYesNot: (isOpen, content) => dispatch(setModalYesNot(isOpen, content))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavClassPanel)
