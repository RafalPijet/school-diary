import {createActionName} from "../../utilities/functions";

const reducerName = 'students';

//ACTIONS TYPE
export const LOAD_ALL_STUDENTS = createActionName(reducerName, 'LOAD_ALL_STUDENTS');
export const ADD_STUDENT = createActionName(reducerName, 'ADD_STUDENT');
export const UPDATE_STUDENT = createActionName(reducerName, 'UPDATE_STUDENT');
export const DELETE_STUDENT = createActionName(reducerName, 'DELETE_STUDENT');
export const SET_FREE_STUDENTS = createActionName(reducerName, 'SET_FREE_STUDENTS');

//CREATORS OF ACTIONS
export const loadAllStudents = students => ({students, type: LOAD_ALL_STUDENTS});
export const addStudent = student => ({student, type: ADD_STUDENT});
export const updateStudent = student => ({student, type: UPDATE_STUDENT});
export const deleteStudent = id => ({id, type: DELETE_STUDENT});
export const setFreeStudents = students => ({students, type: SET_FREE_STUDENTS});

//SELECTORS
export const getAllStudents = state => state.students.allStudents;
export const getStudentsAmount = state => state.students.allStudents.length;
export const getFreeStudents = state => state.students.freeStudents;
