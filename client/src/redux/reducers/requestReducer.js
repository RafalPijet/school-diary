import {
    START_REQUEST,
    STOP_REQUEST,
    ERROR_REQUEST,
    RESET_REQUEST,
    START_ADDING_REQUEST,
    STOP_ADDING_REQUEST
} from "../actions/requestActions";

const initialState = {
    pending: false,
    error: null,
    success: null,
    adding: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_REQUEST:
            return {...state, pending: true, error: null, success: null, adding: false};
        case STOP_REQUEST:
            return {...state, pending: false, error: null, success: true, adding: false};
        case ERROR_REQUEST:
            return {...state, pending: false, error: action.error, success: false, adding: false};
        case RESET_REQUEST:
            return {...state, pending: false, error: null, success: null, adding: false};
        case START_ADDING_REQUEST:
            return {...state, pending: false, error: null, success: true, adding: true};
        case STOP_ADDING_REQUEST:
            return {...state, pending: false, error: null, success: true, adding: false};
        default:
            return state

    }
};

export default reducer;
