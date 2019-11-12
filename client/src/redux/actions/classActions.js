import {createActionName} from '../../utilities/functions';

const reducerName = 'class';

//ACTIONS TYPE
export const LOAD_CLASS_BY_TEACHER_ID = createActionName(reducerName, 'LOAD_CLASS_BY_TEACHER_ID');
export const SELECT_CLASS = createActionName(reducerName, 'SELECT_CLASS');

//CREATORS OF ACTIONS
export const loadClassByTeacher = allClass => ({allClass, type: LOAD_CLASS_BY_TEACHER_ID});
export const setSelectedClass = diary => ({diary, type: SELECT_CLASS});

//SELECTORS
export const getTeacherAllClass = state => state.classes.teacherAllClass;
export const getSelectedClass = state => state.classes.selectedClass;
