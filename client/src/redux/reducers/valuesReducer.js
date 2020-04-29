import {
    SET_IS_DARK,
    SET_IS_UPDATE_RATING,
    SET_IS_NEW_RATING,
    SET_MODAL_YES_NOT,
    SET_MAX_BIRTH_DATE,
    SET_ALERT_SUCCESS
} from "../actions/valuesActions";

const initialState = {
    isDark: true,
    isUpdateRating: false,
    isNewRating: false,
    modalYesNot: {isOpen: false, content: {description: '', data: {}}},
    ratingDescriptions: ['homework', 'teamwork', 'school test', 'response'],
    ratingScales: [1, 2, 3],
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
    },
    maxBirthDate: '2014-01-01',
    alertSuccess: {isOpen: false, message: ''}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_DARK:
            return {...state, isDark: action.isDark};
        case SET_IS_UPDATE_RATING:
            return {...state, isUpdateRating: action.isUpdate};
        case SET_IS_NEW_RATING:
            return {...state, isNewRating: action.isNewRating};
        case SET_MODAL_YES_NOT:
            return {...state, modalYesNot: {isOpen: action.isOpen, content: action.content}};
        case SET_MAX_BIRTH_DATE:
            return {...state, maxBirthDate: action.date};
        case SET_ALERT_SUCCESS:
            return {...state, alertSuccess: {isOpen: action.isOpen, message: action.message}};
        default:
            return state;
    }
};

export default reducer;
