import {createActionName} from "../../utilities/functions";

const reducerName = 'users';

//ACTIONS TYPE
export const SET_LOGIN = createActionName(reducerName, 'SET_LOGIN');
export const SET_REGISTER = createActionName(reducerName, 'SET_REGISTER');
export const SET_USER = createActionName(reducerName, 'SET_USER');
export const UPDATE_USER_DATA = createActionName(reducerName, 'UPDATE_USER_DATA');
export const LOAD_TEACHERS = createActionName(reducerName, 'LOAD_TEACHERS');
export const LOAD_PARENTS = createActionName(reducerName, 'LOAD_PARENTS');
export const UPDATE_PARENT = createActionName(reducerName, 'UPDATE_PARENT');
export const UPDATE_PARENT_STUDENT_CLASS_NAME = createActionName(reducerName, 'UPDATE_PARENT_STUDENT_CLASS_NAME');
export const LOAD_USERS_NAME = createActionName(reducerName, 'LOAD_USERS_NAME');
export const REMOVE_USER_NAME = createActionName(reducerName, 'REMOVE_USER_NAME');
export const ADD_PARENT = createActionName(reducerName, 'ADD_PARENT');
export const ADD_CLASSNAME_TO_STUDENT = createActionName(reducerName, 'ADD_CLASSNAME_TO_STUDENT');

//CREATORS OF ACTIONS
export const setLogin = isLogin => ({isLogin, type: SET_LOGIN});
export const setRegister = login => ({login, type: SET_REGISTER});
export const setUser = user => ({user, type: SET_USER});
export const updateUserData = data => ({data, type: UPDATE_USER_DATA});
export const loadTeachers = teachers => ({teachers, type: LOAD_TEACHERS});
export const loadParents = parents => ({parents, type: LOAD_PARENTS});
export const updateParent = (id, studentsList) => ({id, studentsList, type: UPDATE_PARENT});
export const updateParentStudentClassName = (parentId, studentId, className) =>
    ({parentId, studentId, className, type: UPDATE_PARENT_STUDENT_CLASS_NAME});
export const loadUsersName = users => ({users, type: LOAD_USERS_NAME});
export const removeUserName = id => ({id, type: REMOVE_USER_NAME});
export const addParent = parent => ({parent, type: ADD_PARENT});
export const addClassnameToStudent = (studentId, className) => ({studentId, className, type: ADD_CLASSNAME_TO_STUDENT});

//SELECTORS
export const getLogin = store => store.user.isLogin;
export const getRegister = store => store.user.register;
export const getUser = store => store.user.user;
export const getUserId = store => store.user.user.id;
export const getTeachers = store => store.user.teachers;
export const getParents = store => store.user.parents;
export const getUsersName = store => store.user.usersName;
export const getUserStatus = store => store.user.user.status;
