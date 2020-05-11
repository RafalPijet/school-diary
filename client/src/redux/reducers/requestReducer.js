import {
    START_REQUEST,
    STOP_REQUEST,
    ERROR_REQUEST,
    RESET_REQUEST,
    START_ADDING_REQUEST,
    STOP_ADDING_REQUEST,
    START_WORKING_REQUEST,
    STOP_WORKING_REQUEST,
    START_UPDATING_REQUEST,
    STOP_UPDATING_REQUEST
} from "../actions/requestActions";

const initialState = {
    pending: false,
    error: null,
    success: null,
    adding: false,
    working: false,
    updating: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_REQUEST:
            return {...state, pending: true, error: null, success: null, adding: false};
        case STOP_REQUEST:
            return {...state, pending: false, error: null, success: true, adding: false};
        case ERROR_REQUEST:
            return {...state, pending: false, error: action.error, success: false, adding: false, working: false};
        case RESET_REQUEST:
            return {...state, pending: false, error: null, success: null, adding: false, working: false, updating: false};
        case START_ADDING_REQUEST:
            return {...state, pending: false, error: null, success: true, adding: true, working: false};
        case STOP_ADDING_REQUEST:
            return {...state, pending: false, error: null, success: true, adding: false, working: false};
        case START_WORKING_REQUEST:
            return {...state, pending: false, error: null, success: null, adding: false, working: true};
        case STOP_WORKING_REQUEST:
            return {...state, pending: false, error: null, success: true, adding: false, working: false};
        case START_UPDATING_REQUEST:
            return {...state, updating: true};
        case STOP_UPDATING_REQUEST:
            return {...state, updating: false};
        default:
            return state

    }
};

export default reducer;
