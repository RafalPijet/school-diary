import {createActionName} from '../../utilities/functions';

const reducerName = 'class';

//ACTIONS TYPE
export const LOAD_CLASS_BY_TEACHER_ID = createActionName(reducerName, 'LOAD_CLASS_BY_TEACHER_ID');

//CREATORS OF ACTIONS
export const loadClassByTeacher = allClass => ({allClass, type: LOAD_CLASS_BY_TEACHER_ID});

//SELECTORS
export const getTeacherAllClass = state => state.classes.teacherAllClass;
