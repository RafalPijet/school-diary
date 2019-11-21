import {connect} from "react-redux";
import RatingOptions from './RatingOptions';
import {
    setIsPlus,
    getIsNewRating,
    getRatingDescriptions,
    getRatingScales,
    setDescription,
    setScales
} from "../../../redux/actions/valuesActions";

const mapDispatchToProps = dispatch => ({
    setIsPlus: isPlus => dispatch(setIsPlus(isPlus)),
    setDescription: desc => dispatch(setDescription(desc)),
    setScales: value => dispatch(setScales(value))
});

const mapStateToProps = state => ({
    isNewRating: getIsNewRating(state),
    ratingDescriptions: getRatingDescriptions(state),
    ratingScales: getRatingScales(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingOptions);
