import {
    SET_IS_DARK,
    SET_IS_UPDATE_RATING,
    SET_IS_NEW_RATING,
    SET_RATING_VALUE,
    SET_DESCRIPTION,
    SET_SCALES
} from "../actions/valuesActions";

const initialState = {
    isDark: true,
    isUpdateRating: false,
    isNewRating: false,
    ratingValue: "",
    ratingDescriptions: ['homework', 'teamwork', 'school test', 'response'],
    ratingScales: [1, 2, 3],
    selectedDescription: "",
    selectedScales: 1,
    availableSubjects: {
        all: ['english', 'polish', 'german', 'math', 'biology', 'history', 'geography', 'physics', 'chemistry',
            'informatics', 'physical education', 'form period', 'social studies', 'career counseling', 'music',
            'art', 'family life education', 'technology', 'natural science', 'safety education'],
        class8: ['polish', 'math', 'english', 'german', 'history', 'geography', 'biology', 'chemistry', 'physics',
            'informatics', 'physical education', 'form period', 'social studies', 'safety education',
            'career counseling'],
        class7: ['polish', 'math', 'english', 'german', 'history', 'geography', 'biology', 'chemistry', 'physics',
            'informatics', 'physical education', 'form period', 'family life education', 'music', 'art',
            'career counseling'],
        class6: ['polish', 'math', 'english', 'history', 'natural science', 'technology', 'music', 'art',
            'informatics', 'physical education', 'form period', 'family life education'],
        class5: ['biology', 'geography', 'history', 'informatics', 'english', 'polish', 'math', 'music', 'art',
            'technology', 'family life education', 'physical education', 'form period'],
        class4: ['history', 'informatics', 'english', 'polish', 'math', 'music', 'art', 'natural science',
            'technology', 'family life education', 'physical education', 'form period']
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_DARK:
            return {...state, isDark: action.isDark};
        case SET_IS_UPDATE_RATING:
            return {...state, isUpdateRating: action.isUpdate};
        case SET_IS_NEW_RATING:
            return {...state, isNewRating: action.isNewRating};
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
