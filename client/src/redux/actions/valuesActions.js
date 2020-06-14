import {createActionName} from "../../utilities/functions";

const reducerName = 'values';

// ACTIONS
export const SET_IS_DARK = createActionName(reducerName, 'SET_IS_DARK');
export const SET_IS_UPDATE_RATING = createActionName(reducerName, 'SET_IS_UPDATE_RATING');
export const SET_IS_NEW_RATING = createActionName(reducerName, 'SET_IS_NEW_RATING');
export const SET_IS_STUDENT_MODE = createActionName(reducerName, 'SET_IS_STUDENT_MODE');
export const SET_TUTOR_IS_USE = createActionName(reducerName, 'SET_TUTOR_IS_USE');
export const SET_MODAL_YES_NOT = createActionName(reducerName, 'SET_MODAL_YES_NOT');
export const SET_MAX_BIRTH_DATE = createActionName(reducerName, 'SET_MAX_BIRTH_DATE');
export const SET_ALERT_SUCCESS = createActionName(reducerName, 'SET_ALERT_SUCCESS');
export const SET_AVAILABLE = createActionName(reducerName, 'SET_AVAILABLE');

// CREATORS OF ACTIONS
export const setIsDark = isDark => ({isDark, type: SET_IS_DARK});
export const setIsUpdateRating = isUpdate => ({isUpdate, type: SET_IS_UPDATE_RATING});
export const setIsNewRating = isNewRating => ({isNewRating, type: SET_IS_NEW_RATING});
export const setIsStudentMode = isStudentMode => ({isStudentMode, type: SET_IS_STUDENT_MODE});
export const setTutorIsUse = isUse => ({isUse, type: SET_TUTOR_IS_USE});
export const setModalYesNot = (isOpen, content) => ({isOpen, content, type: SET_MODAL_YES_NOT});
export const setMaxBirthDate = date => ({date, type: SET_MAX_BIRTH_DATE});
export const setAlertSuccess = (isOpen, message) => ({isOpen, message, type: SET_ALERT_SUCCESS});
export const setAvailable = available => ({available, type: SET_AVAILABLE});

// SELECTORS
export const getIsDark = state => state.values.isDark;
export const getIsUpdateRating = state => state.values.isUpdateRating;
export const getIsNewRating = state => state.values.isNewRating;
export const getIsStudentMode = state => state.values.isStudentMode;
export const getTutorIsUse = state => state.values.tutorIsUse;
export const getModalYesNot = state => state.values.modalYesNot;
export const getRatingDescriptions = state => state.values.ratingDescriptions;
export const getRatingScales = state => state.values.ratingScales;
export const getSubjects = state => state.values.availableSubjects;
export const getMaxBirthDate = state => state.values.maxBirthDate;
export const getAlertSuccess = state => state.values.alertSuccess;
export const getAvailable = state => state.values.available;
