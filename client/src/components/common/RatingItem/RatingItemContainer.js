import {connect} from 'react-redux';
import {setIsUpdateRating, getIsisUpdateRating, getIsNewRating} from "../../../redux/actions/valuesActions";
import {getRequest, resetRequest} from "../../../redux/actions/requestActions";
import RatingItem from "./RatingItem";

const mapStateToProps = state => ({
    isUpdateRating: getIsisUpdateRating(state),
    isNewRating: getIsNewRating(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    setIsUpdateRating: isUpdateRating => dispatch(setIsUpdateRating(isUpdateRating)),
    resetRequest: () => dispatch(resetRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingItem);
