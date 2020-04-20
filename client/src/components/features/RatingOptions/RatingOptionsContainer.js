import {connect} from "react-redux";
import RatingOptions from './RatingOptions';
import {addRatingForStudent, updateRatingForStudent} from "../../../redux/thunks";
import {
    getRatingDescriptions,
    getRatingScales,
} from "../../../redux/actions/valuesActions";

const mapDispatchToProps = dispatch => ({
    addRating: (classId, dataPackage) => dispatch(addRatingForStudent(classId, dataPackage)),
    updateRating: dataPackage => dispatch(updateRatingForStudent(dataPackage))
});

const mapStateToProps = state => ({
    ratingDescriptions: getRatingDescriptions(state),
    ratingScales: getRatingScales(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingOptions);
