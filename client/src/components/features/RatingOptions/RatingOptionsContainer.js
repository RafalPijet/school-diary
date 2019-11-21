import {connect} from "react-redux";
import RatingOptions from './RatingOptions';
import {setIsPlus, getIsNewRating} from "../../../redux/actions/valuesActions";

const mapDispatchToProps = dispatch => ({
    setIsPlus: isPlus => dispatch(setIsPlus(isPlus))
});

const mapStateToProps = state => ({
    isNewRating: getIsNewRating(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingOptions);
