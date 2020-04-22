import {connect} from 'react-redux';
import DiaryRow from './DiaryRow';
import {
    setIsNewRating,
    getIsNewRating,
    getIsUpdateRating,
    setIsUpdateRating
} from "../../../redux/actions/valuesActions";
import {getRequest} from "../../../redux/actions/requestActions";

const mapStateToProps = state => ({
    isNewRating: getIsNewRating(state),
    request: getRequest(state),
    isUpdateRating: getIsUpdateRating(state)
});

const mapDispatchToProps = dispatch => ({
    setIsNewRating: isNewRating => dispatch(setIsNewRating(isNewRating)),
    setIsUpdateRating: isUpdateRating => dispatch(setIsUpdateRating(isUpdateRating))

});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryRow);
