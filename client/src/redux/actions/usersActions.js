import {createActionName} from "../../utilities/functions";

const reducerName = 'users';

//ACTIONS TYPE
export const SET_LOGIN = createActionName(reducerName, 'SET_LOGIN');
export const SET_USER = createActionName(reducerName, 'SET_USER');

//CREATORS OF ACTIONS
export const setLogin = isLogin => ({isLogin, type: SET_LOGIN});
export const setUser = user => ({user, type: SET_USER});

//SELECTORS
export const getLogin = store => store.user.isLogin;
export const getUser = store => store.user.user;
