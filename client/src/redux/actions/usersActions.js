import {createActionName} from "../../utilities/functions";

const reducerName = 'users';

//ACTIONS TYPE
export const SET_LOGIN = createActionName(reducerName, 'SET_LOGIN');
export const SET_USER = createActionName(reducerName, 'SET_USER');
export const LOAD_TEACHERS = createActionName(reducerName, 'LOAD_TEACHERS');

//CREATORS OF ACTIONS
export const setLogin = isLogin => ({isLogin, type: SET_LOGIN});
export const setUser = user => ({user, type: SET_USER});
export const loadTeachers = teachers => ({teachers, type: LOAD_TEACHERS});

//SELECTORS
export const getLogin = store => store.user.isLogin;
export const getUser = store => store.user.user;
export const getTeachers = store => store.user.teachers;
