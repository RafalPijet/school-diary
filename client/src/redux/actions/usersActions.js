import {createActionName} from "../../utilities/functions";

const reducerName = 'users';

//ACTIONS TYPE
export const SET_LOGIN = createActionName(reducerName, 'SET_LOGIN');
export const SET_REGISTER = createActionName(reducerName, 'SET_REGISTER');
export const SET_USER = createActionName(reducerName, 'SET_USER');
export const LOAD_TEACHERS = createActionName(reducerName, 'LOAD_TEACHERS');
export const LOAD_PARENTS = createActionName(reducerName, 'LOAD_PARENTS');
export const UPDATE_PARENT = createActionName(reducerName, 'UPDATE_PARENT');
export const DELETE_PARENT = createActionName(reducerName, 'DELETE_PARENT');

//CREATORS OF ACTIONS
export const setLogin = isLogin => ({isLogin, type: SET_LOGIN});
export const setRegister = login => ({login, type: SET_REGISTER});
export const setUser = user => ({user, type: SET_USER});
export const loadTeachers = teachers => ({teachers, type: LOAD_TEACHERS});
export const loadParents = parents => ({parents, type: LOAD_PARENTS});
export const updateParent = parent => ({parent, type: UPDATE_PARENT});
export const deleteParent = id => ({id, type: DELETE_PARENT});

//SELECTORS
export const getLogin = store => store.user.isLogin;
export const getRegister = store => store.user.register;
export const getUser = store => store.user.user;
export const getTeachers = store => store.user.teachers;
export const getParents = store => store.user.parents;
