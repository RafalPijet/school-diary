import {connect} from 'react-redux';
import DiaryRow from './DiaryRow';
import {
    setIsNewRating,
    getIsNewRating,
    setRatingValue,
    getRatingValue,
    setDescription,
    setScales,
    getSelectedDescription,
    getSelectedScales,
    getIsisUpdateRating
} from "../../../redux/actions/valuesActions";
import {getRequest} from "../../../redux/actions/requestActions";
import {addRatingForStudent} from "../../../redux/thunks";

const mapStateToProps = state => ({
    isNewRating: getIsNewRating(state),
    ratingValue: getRatingValue(state),
    selectedDescription: getSelectedDescription(state),
    selectedScales: getSelectedScales(state),
    request: getRequest(state),
    isUpdateRating: getIsisUpdateRating(state)
});

const mapDispatchToProps = dispatch => ({
    setIsNewRating: isNewRating => dispatch(setIsNewRating(isNewRating)),
    setRatingValue: value => dispatch(setRatingValue(value)),
    setDescription: desc => dispatch(setDescription(desc)),
    setScales: value => dispatch(setScales(value)),
    addRating: dataPackage => dispatch(addRatingForStudent(dataPackage))
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryRow);
