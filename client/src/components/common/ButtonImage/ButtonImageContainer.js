import {connect} from 'react-redux';
import {setPath} from "../../../redux/actions/valuesActions";
import ButtonImage from "./ButtonImage";

const mapDispatchToProps = dispatch => ({
    setPath: path => dispatch(setPath(path))
});

export default connect(null, mapDispatchToProps)(ButtonImage)
