import {createActionName} from "../../utilities/functions";

const reducerName = 'values';

// ACTIONS
export const SET_IS_PLUS = createActionName(reducerName, 'SET_IS_PLUS');
export const SET_IS_NEW_RATING = createActionName(reducerName, 'SET_IS_NEW_RATING');
export const SET_RATING_VALUE = createActionName(reducerName, 'SET_RATING_VALUE');

// CREATORS OF ACTIONS
export const setIsPlus = isPlus => ({isPlus, type: SET_IS_PLUS});
export const setIsNewRating = (isNewRating, studentId) => ({isNewRating, studentId, type: SET_IS_NEW_RATING});
export const setRatingValue = value => ({value, type: SET_RATING_VALUE});

// SELECTORS
export const getIsPlus = state => state.values.isPlus;
export const getIsNewRating = state => state.values.isNewRating;
export const getRatingValue = state => state.values.ratingValue;
