import {createActionName} from '../../utilities/functions';

const reducerName = 'class';

//ACTIONS TYPE
export const LOAD_CLASS_BY_TEACHER_ID = createActionName(reducerName, 'LOAD_CLASS_BY_TEACHER_ID');
export const LOAD_ALL_CLASSES = createActionName(reducerName, 'LOAD_ALL_CLASSES');
export const SELECT_CLASS = createActionName(reducerName, 'SELECT_CLASS');
export const ADD_RATING_TO_STUDENT = createActionName(reducerName, 'ADD_RATING_TO_STUDENT');
export const UPDATE_RATING_TO_STUDENT = createActionName(reducerName, 'UPDATE_RATING_TO_STUDENT');
export const ADD_NEW_CLASS = createActionName(reducerName, 'ADD_NEW_CLASS');
export const UPDATE_STUDENT_IN_TEACHER_CLASS = createActionName(reducerName, 'UPDATE_STUDENT_IN_TEACHER_CLASS');
export const UPDATE_DATA_IN_SELECTED_CLASS = createActionName(reducerName, 'UPDATE_DATA_IN_SELECTED_CLASS');
export const UPDATE_TUTOR_IN_SELECTED_CLASS = createActionName(reducerName, 'UPDATE_TUTOR_IN_SELECTED_CLASS');
export const UPDATE_TUTOR_IN_ALL_CLASSES = createActionName(reducerName, 'UPDATE_TUTOR_IN_ALL_CLASSES');
export const UPDATE_LIST_IN_SELECTED_CLASS = createActionName(reducerName, 'UPDATE_LIST_IN_SELECTED_CLASS');
export const DELETE_CLASS_IN_ALL_CLASSES = createActionName(reducerName, 'DELETE_CLASS_IN_ALL_CLASSES');

//CREATORS OF ACTIONS
export const loadClassByTeacher = allClass => ({allClass, type: LOAD_CLASS_BY_TEACHER_ID});
export const loadAllClasses = allClasses => ({allClasses, type: LOAD_ALL_CLASSES});
export const setSelectedClass = classItem => ({classItem, type: SELECT_CLASS});
export const addRatingToStudent = (classId, rating) => ({classId, rating, type: ADD_RATING_TO_STUDENT});
export const updateRatingToStudent = (classId, studentId, rating) =>
    ({classId, studentId, rating, type: UPDATE_RATING_TO_STUDENT});
export const addNewClass = newClass => ({newClass, type: ADD_NEW_CLASS});
export const updateStudentInTeacherClass = student => ({student, type: UPDATE_STUDENT_IN_TEACHER_CLASS});
export const updateDataInSelectedClass = data => ({data, type: UPDATE_DATA_IN_SELECTED_CLASS});
export const updateTutorInSelectedClass = tutor => ({tutor, type: UPDATE_TUTOR_IN_SELECTED_CLASS});
export const updateTutorInAllClasses = (classId, tutorId) => ({classId, tutorId, type: UPDATE_TUTOR_IN_ALL_CLASSES});
export const updateListInSelectedClass = (isStudent, list) => ({isStudent, list, type: UPDATE_LIST_IN_SELECTED_CLASS});
export const deleteClassInAllClasses = id => ({id, type: DELETE_CLASS_IN_ALL_CLASSES});

//SELECTORS
export const getTeacherAllClass = state => state.classes.teacherAllClass;
export const getAllClasses = state => state.classes.allClasses;
export const getSelectedClass = state => state.classes.selectedClass;
export const getAvailableNames = state => state.classes.availableNames;
