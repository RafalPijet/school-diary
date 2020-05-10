import {createActionName} from "../../utilities/functions";

const reducerName = 'request';

// ACTIONS
export const START_REQUEST = createActionName(reducerName, 'START_REQUEST');
export const STOP_REQUEST = createActionName(reducerName, 'STOP_REQUEST');
export const ERROR_REQUEST = createActionName(reducerName, 'ERROR_REQUEST');
export const RESET_REQUEST = createActionName(reducerName, 'RESET_REQUEST');
export const START_ADDING_REQUEST = createActionName(reducerName, 'START_ADDING_REQUEST');
export const STOP_ADDING_REQUEST = createActionName(reducerName, 'STOP_ADDING_REQUEST');
export const START_WORKING_REQUEST = createActionName(reducerName, 'START_WORKING_REQUEST');
export const STOP_WORKING_REQUEST = createActionName(reducerName, 'STOP_WORKING_REQUEST');
export const START_UPDATING_REQUEST = createActionName(reducerName, 'START_UPDATING_REQUEST');
export const STOP_UPDATING_REQUEST = createActionName(reducerName, 'STOP_UPDATING_REQUEST');

// CREATORS OF ACTIONS
export const startRequest = () => ({type: START_REQUEST});
export const stopRequest = () => ({type: STOP_REQUEST});
export const errorRequest = error => ({error, type: ERROR_REQUEST});
export const resetRequest = () => ({type: RESET_REQUEST});
export const startAddingRequest = () => ({type: START_ADDING_REQUEST});
export const stopAddingRequest = () => ({type: STOP_ADDING_REQUEST});
export const startWorkingRequest = () => ({type: START_WORKING_REQUEST});
export const stopWorkingRequest = () => ({type: STOP_WORKING_REQUEST});
export const startUpdatingRequest = () => ({type: START_UPDATING_REQUEST});
export const stopUpdatingRequest = () => ({type: STOP_UPDATING_REQUEST});

// SELECTORS
export const getRequest = store => store.request;
