import {connect} from 'react-redux';
import DiaryRow from './DiaryRow';
import {
    getIsPlus,
    setIsNewRating,
    getIsNewRating,
    setRatingValue,
    getRatingValue,
    setIsPlus
} from "../../../redux/actions/valuesActions";

const mapStateToProps = state => ({
    isPlus: getIsPlus(state),
    isNewRating: getIsNewRating(state),
    getRatingValue: getRatingValue(state)
});

const mapDispatchToProps = dispatch => ({
    setIsNewRating: (isNewRating, studentId) => dispatch(setIsNewRating(isNewRating, studentId)),
    setRatingValue: value => dispatch(setRatingValue(value)),
    setIsPlus: isPlus => dispatch(setIsPlus(isPlus))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryRow);
