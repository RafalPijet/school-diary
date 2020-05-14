import {
    SET_LOGIN,
    SET_REGISTER,
    SET_USER,
    LOAD_TEACHERS,
    LOAD_PARENTS,
    UPDATE_PARENT,
    DELETE_PARENT
} from "../actions/usersActions";

const initialState = {
    isLogin: true,
    register: {email: {}, password: {}},
    teachers: [],
    parents: [],
    user: {
        _id : "5e9fd27c00fe4800d6ccbc62",
        students : [],
        id : "9f588fad-c77b-4927-8cfc-03a8a0195be9",
        status : "teacher",
        subject : "math",
        firstName : "David",
        lastName : "Gahan",
        telephone : "508 567 899",
        email : "david@gmail.com",
        password : "qqq",
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, isLogin: action.isLogin};
        case SET_REGISTER:
            return {...state, register: {email: action.login.email, password: action.login.password}};
        case SET_USER:
            return {...state, user: action.user};
        case LOAD_TEACHERS:
            return {...state, teachers: action.teachers};
        case LOAD_PARENTS:
            return {...state, parents: action.parents};
        case UPDATE_PARENT:
            return {
                ...state, parents: state.parents.map(parent => {
                    if (parent.id === action.parent.id) {
                        return action.parent;
                    } else {
                        return parent;
                    }
                })
            };
        case DELETE_PARENT:
            return {...state, parents: state.parents.filter(parent => parent.id !== action.id)};
        default:
            return state
    }
};

export default reducer;
