import {createActionName} from "../../utilities/functions";

const reducerName = 'values';

// ACTIONS
export const SET_IS_DARK = createActionName(reducerName, 'SET_IS_DARK');
export const SET_IS_UPDATE_RATING = createActionName(reducerName, 'SET_IS_UPDATE_RATING');
export const SET_IS_NEW_RATING = createActionName(reducerName, 'SET_IS_NEW_RATING');
export const SET_RATING_VALUE = createActionName(reducerName, 'SET_RATING_VALUE');
export const SET_DESCRIPTION = createActionName(reducerName, 'SET_DESCRIPTION');
export const SET_SCALES = createActionName(reducerName, 'SET_SCALES');

// CREATORS OF ACTIONS
export const setIsDark = isDark => ({isDark, type: SET_IS_DARK});
export const setIsUpdateRating = isUpdate => ({isUpdate, type: SET_IS_UPDATE_RATING});
export const setIsNewRating = (isNewRating, studentId) => ({isNewRating, studentId, type: SET_IS_NEW_RATING});
export const setRatingValue = value => ({value, type: SET_RATING_VALUE});
export const setDescription = desc => ({desc, type: SET_DESCRIPTION});
export const setScales = value => ({value, type: SET_SCALES});

// SELECTORS
export const getIsDark = state => state.values.isDark;
export const getIsisUpdateRating = state => state.values.isUpdateRating;
export const getIsNewRating = state => state.values.isNewRating;
export const getRatingValue = state => state.values.ratingValue;
export const getRatingDescriptions = state => state.values.ratingDescriptions;
export const getRatingScales = state => state.values.ratingScales;
export const getSelectedDescription = state => state.values.selectedDescription;
export const getSelectedScales = state => state.values.selectedScales;
export const getSubjects = state => state.values.availableSubjects;
