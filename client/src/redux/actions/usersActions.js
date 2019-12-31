import {createActionName} from "../../utilities/functions";

const reducerName = 'users';

//ACTIONS TYPE
export const SET_LOGIN = createActionName(reducerName, 'SET_LOGIN');
export const SET_USER = createActionName(reducerName, 'SET_USER');
export const LOAD_TEACHERS = createActionName(reducerName, 'LOAD_TEACHERS');
export const LOAD_PARENTS = createActionName(reducerName, 'LOAD_PARENTS');

//CREATORS OF ACTIONS
export const setLogin = isLogin => ({isLogin, type: SET_LOGIN});
export const setUser = user => ({user, type: SET_USER});
export const loadTeachers = teachers => ({teachers, type: LOAD_TEACHERS});
export const loadParents = parents => ({parents, type: LOAD_PARENTS});

//SELECTORS
export const getLogin = store => store.user.isLogin;
export const getUser = store => store.user.user;
export const getTeachers = store => store.user.teachers;
export const getParents = store => store.user.parents;
