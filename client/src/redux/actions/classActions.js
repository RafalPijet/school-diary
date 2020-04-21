import {createActionName} from '../../utilities/functions';

const reducerName = 'class';

//ACTIONS TYPE
export const LOAD_CLASS_BY_TEACHER_ID = createActionName(reducerName, 'LOAD_CLASS_BY_TEACHER_ID');
export const LOAD_ALL_CLASSES = createActionName(reducerName, 'LOAD_ALL_CLASSES');
export const SELECT_CLASS = createActionName(reducerName, 'SELECT_CLASS');
export const ADD_RATING_TO_STUDENT = createActionName(reducerName, 'ADD_RATING_TO_STUDENT');
export const UPDATE_RATING_TO_STUDENT = createActionName(reducerName, 'UPDATE_RATING_TO_STUDENT');
export const ADD_USER_TO_CLASS = createActionName(reducerName, 'ADD_USER_TO_CLASS');
export const UPDATE_CLASS = createActionName(reducerName, 'UPDATE_CLASS');

//CREATORS OF ACTIONS
export const loadClassByTeacher = allClass => ({allClass, type: LOAD_CLASS_BY_TEACHER_ID});
export const loadAllClasses = allClasses => ({allClasses, type: LOAD_ALL_CLASSES});
export const setSelectedClass = diary => ({diary, type: SELECT_CLASS});
export const addRatingToStudent = (classId, rating) => ({classId, rating, type: ADD_RATING_TO_STUDENT});
export const updateRatingToStudent = (classId, studentId, rating) =>
    ({classId, studentId, rating, type: UPDATE_RATING_TO_STUDENT});
export const addUserToClass = classContent => ({classContent, type: ADD_USER_TO_CLASS});
export const updateClass = classItem => ({classItem, type: UPDATE_CLASS});



//SELECTORS
export const getTeacherAllClass = state => state.classes.teacherAllClass;
export const getAllClasses = state => state.classes.allClasses;
export const getSelectedClass = state => state.classes.selectedClass;
