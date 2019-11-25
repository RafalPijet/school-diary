import {connect} from 'react-redux';
import DiaryRow from './DiaryRow';
import {
    getIsPlus,
    setIsNewRating,
    getIsNewRating,
    setRatingValue,
    getRatingValue,
    setIsPlus,
    setDescription,
    setScales,
    getSelectedDescription,
    getSelectedScales
} from "../../../redux/actions/valuesActions";
import {addRatingForStudent} from "../../../redux/thunks";

const mapStateToProps = state => ({
    isPlus: getIsPlus(state),
    isNewRating: getIsNewRating(state),
    ratingValue: getRatingValue(state),
    selectedDescription: getSelectedDescription(state),
    selectedScales: getSelectedScales(state)
});

const mapDispatchToProps = dispatch => ({
    setIsNewRating: (isNewRating, studentId) => dispatch(setIsNewRating(isNewRating, studentId)),
    setRatingValue: value => dispatch(setRatingValue(value)),
    setIsPlus: isPlus => dispatch(setIsPlus(isPlus)),
    setDescription: desc => dispatch(setDescription(desc)),
    setScales: value => dispatch(setScales(value)),
    addRating: dataPackage => dispatch(addRatingForStudent(dataPackage))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryRow);
