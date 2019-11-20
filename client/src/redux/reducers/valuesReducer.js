import {SET_IS_PLUS, SET_IS_NEW_RATING, SET_RATING_VALUE} from "../actions/valuesActions";

const initialState = {
    isPlus: null,
    isNewRating: {isNew: false, studentId: ""},
    ratingValue: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_PLUS:
            return {...state, isPlus: (action.isPlus !== 'undefined' ? JSON.parse(action.isPlus) : null)};
        case SET_IS_NEW_RATING:
            return {...state, isNewRating: {isNew: action.isNewRating, studentId: action.studentId}};
        case SET_RATING_VALUE:
            return {...state, ratingValue: action.value};
        default:
            return state;
    }
};

export default reducer;
