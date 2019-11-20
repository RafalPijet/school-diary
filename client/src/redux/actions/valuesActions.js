import {createActionName} from "../../utilities/functions";

const reducerName = 'values';

// ACTIONS
export const SET_IS_PLUS = createActionName(reducerName, 'SET_IS_PLUS');

// CREATORS OF ACTIONS
export const set_isPlus = isPlus => ({isPlus, type: SET_IS_PLUS});

// SELECTORS
export const get_isPlus = state => state.values.isPlus;
