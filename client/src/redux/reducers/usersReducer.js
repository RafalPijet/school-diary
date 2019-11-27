import {SET_LOGIN, SET_USER} from "../actions/usersActions";

const initialState = {
    isLogin: false,
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, isLogin: action.isLogin};
        case SET_USER:
            return {...state, user: action.user};
        default:
            return state
    }
};

export default reducer;
