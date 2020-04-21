import {connect} from 'react-redux';
import {setIsUpdateRating, getIsisUpdateRating, getIsNewRating} from "../../../redux/actions/valuesActions";
import {getRequest} from "../../../redux/actions/requestActions";
import RatingItem from "./RatingItem";

const mapStateToProps = state => ({
    isUpdateRating: getIsisUpdateRating(state),
    isNewRating: getIsNewRating(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    setIsUpdateRating: isUpdateRating => dispatch(setIsUpdateRating(isUpdateRating))
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingItem);
