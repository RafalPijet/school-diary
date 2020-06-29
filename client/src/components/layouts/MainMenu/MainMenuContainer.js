import {connect} from 'react-redux';
import {getPath, setPath} from "../../../redux/actions/valuesActions";
import MainMenu from "./MainMenu";

const mapStateToProps = state => ({
    path: getPath(state)
});

const mapDispatchToProps = dispatch => ({
    setPath: path => dispatch(setPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
