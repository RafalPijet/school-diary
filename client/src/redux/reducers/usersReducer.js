import {SET_LOGIN, SET_USER} from "../actions/usersActions";

const initialState = {
    isLogin: true,
    user: {
        students: [],
        _id: "5dde40899f03ed9b4de5e5f1)",
        id: "437be7cc-7609-4a23-83e0-6d0ec8a07161",
        status: "principal",
        subject: "",
        firstName: "Rafal",
        lastName: "Pijet",
        birthDate: "2019-11-27T15:43:46.729Z",
        email: "principal@gmail.com",
        password: "qqq",
        __v: 0
    }
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
