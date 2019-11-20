import {connect} from "react-redux";
import RatingOptions from './RatingOptions';
import {setIsPlus} from "../../../redux/actions/valuesActions";

const mapDispatchToProps = dispatch => ({
    setIsPlus: isPlus => dispatch(setIsPlus(isPlus))
});

export default connect(null, mapDispatchToProps)(RatingOptions);
