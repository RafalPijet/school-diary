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
export const UPDATE_PARENT_STUDENT_CLASS_NAME = createActionName(reducerName, 'UPDATE_PARENT_STUDENT_CLASS_NAME');
export const LOAD_PARENTS_NAME = createActionName(reducerName, 'LOAD_PARENTS_NAME');
export const REMOVE_PARENT_NAME = createActionName(reducerName, 'REMOVE_PARENT_NAME');

//CREATORS OF ACTIONS
export const setLogin = isLogin => ({isLogin, type: SET_LOGIN});
export const setRegister = login => ({login, type: SET_REGISTER});
export const setUser = user => ({user, type: SET_USER});
export const loadTeachers = teachers => ({teachers, type: LOAD_TEACHERS});
export const loadParents = parents => ({parents, type: LOAD_PARENTS});
export const updateParent = (id, studentsList) => ({id, studentsList, type: UPDATE_PARENT});
export const deleteParent = id => ({id, type: DELETE_PARENT});
export const updateParentStudentClassName = (parentId, studentId, className) =>
    ({parentId, studentId, className, type: UPDATE_PARENT_STUDENT_CLASS_NAME});
export const loadParentsName = parents => ({parents, type: LOAD_PARENTS_NAME});
export const removeParentName = id => ({id, type: REMOVE_PARENT_NAME});

//SELECTORS
export const getLogin = store => store.user.isLogin;
export const getRegister = store => store.user.register;
export const getUser = store => store.user.user;
export const getTeachers = store => store.user.teachers;
export const getParents = store => store.user.parents;
export const getParentsName = store => store.user.parentsName;
