import {createActionName} from "../../utilities/functions";

const reducerName = 'students';

//ACTIONS TYPE
export const LOAD_ALL_STUDENTS = createActionName(reducerName, 'LOAD_ALL_STUDENTS');
export const UPDATE_STUDENT = createActionName(reducerName, 'UPDATE_STUDENT');

//CREATORS OF ACTIONS
export const loadAllStudents = students => ({students, type: LOAD_ALL_STUDENTS});
export const updateStudent = student => ({student, type: UPDATE_STUDENT});

//SELECTORS
export const getAllStudents = store => store.students.allStudents;
