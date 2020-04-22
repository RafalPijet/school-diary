import {createActionName} from "../../utilities/functions";

const reducerName = 'values';

// ACTIONS
export const SET_IS_DARK = createActionName(reducerName, 'SET_IS_DARK');
export const SET_IS_UPDATE_RATING = createActionName(reducerName, 'SET_IS_UPDATE_RATING');
export const SET_IS_NEW_RATING = createActionName(reducerName, 'SET_IS_NEW_RATING');
export const SET_MODAL_YES_NOT = createActionName(reducerName, 'SET_MODAL_YES_NOT');

// CREATORS OF ACTIONS
export const setIsDark = isDark => ({isDark, type: SET_IS_DARK});
export const setIsUpdateRating = isUpdate => ({isUpdate, type: SET_IS_UPDATE_RATING});
export const setIsNewRating = isNewRating => ({isNewRating, type: SET_IS_NEW_RATING});
export const setModalYesNot = (isOpen, content) => ({isOpen, content, type: SET_MODAL_YES_NOT});

// SELECTORS
export const getIsDark = state => state.values.isDark;
export const getIsUpdateRating = state => state.values.isUpdateRating;
export const getIsNewRating = state => state.values.isNewRating;
export const getModalYesNot = state => state.values.modalYesNot;
export const getRatingDescriptions = state => state.values.ratingDescriptions;
export const getRatingScales = state => state.values.ratingScales;
export const getSubjects = state => state.values.availableSubjects;
