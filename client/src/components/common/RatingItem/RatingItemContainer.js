import {connect} from 'react-redux';
import {setIsUpdateRating, getIsisUpdateRating, getIsNewRating} from "../../../redux/actions/valuesActions";
import RatingItem from "./RatingItem";

const mapStateToProps = state => ({
    isUpdateRating: getIsisUpdateRating(state),
    isNewRating: getIsNewRating(state)
});

const mapDispatchToProps = dispatch => ({
    setIsUpdateRating: isUpdateRating => dispatch(setIsUpdateRating(isUpdateRating))
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingItem);
