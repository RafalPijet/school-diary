import {
    SET_IS_PLUS,
    SET_IS_NEW_RATING,
    SET_RATING_VALUE,
    SET_DESCRIPTION,
    SET_SCALES
} from "../actions/valuesActions";

const initialState = {
    isPlus: null,
    isNewRating: {isNew: false, studentId: ""},
    ratingValue: "",
    ratingDescriptions: ['homework', 'teamwork', 'school test', 'response'],
    ratingScales: [1, 2, 3],
    selectedDescription: "",
    selectedScales: 1
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_PLUS:
            return {...state, isPlus: (action.isPlus !== "" ? JSON.parse(action.isPlus) : null)};
        case SET_IS_NEW_RATING:
            return {...state, isNewRating: {isNew: action.isNewRating, studentId: action.studentId}};
        case SET_RATING_VALUE:
            return {...state, ratingValue: action.value};
        case SET_DESCRIPTION:
            return {...state, selectedDescription: action.desc};
        case SET_SCALES:
            return {...state, selectedScales: parseInt(action.value)};
        default:
            return state;
    }
};

export default reducer;
