import {connect} from 'react-redux';
import {setIsUpdateRating, getIsUpdateRating, getIsNewRating} from "../../../redux/actions/valuesActions";
import {getRequest} from "../../../redux/actions/requestActions";
import RatingItem from "./RatingItem";

const mapStateToProps = state => ({
    isUpdateRating: getIsUpdateRating(state),
    isNewRating: getIsNewRating(state),
    request: getRequest(state)
});

const mapDispatchToProps = dispatch => ({
    setIsUpdateRating: isUpdateRating => dispatch(setIsUpdateRating(isUpdateRating))
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingItem);
