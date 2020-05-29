import {connect} from 'react-redux';
import {getRequest} from "../../../redux/actions/requestActions";
import {setModalYesNot} from "../../../redux/actions/valuesActions";
import StudentItem from "./StudentItem";

const mapStateToProps = state => ({
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    setModalYesNot: (isOpen, content) => dispatch(setModalYesNot(isOpen, content))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentItem);
