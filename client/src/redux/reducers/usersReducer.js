import {SET_LOGIN, SET_USER} from "../actions/usersActions";

const initialState = {
    isLogin: true,
    user: {
        students: [],
        _id: "5dcad33205d61ee53e46a94b",
        id: "7dac7a69-f827-4bc5-8855-4f03d137e8e0",
        status: "teacher",
        subject: "math",
        firstName: "David",
        lastName: "Gahan",
        birthDate: "2019-11-12T15:43:46.729Z",
        email: "david@gmail.com",
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
