import {createActionName} from "../../utilities/functions";

const reducerName = 'students';

//ACTIONS TYPE
export const LOAD_ALL_STUDENTS = createActionName(reducerName, 'LOAD_ALL_STUDENTS');

//CREATORS OF ACTIONS
export const loadAllStudents = students => ({students, type: LOAD_ALL_STUDENTS});

//SELECTORS
export const getAllStudents = state => state.students.allStudents;
