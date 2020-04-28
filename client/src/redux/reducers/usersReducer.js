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
        students: [],
        _id: "5e9fd27c00fe4800d6ccbc31",
        id: "145d5787-e50e-4363-8e78-881b279f6eb5",
        status: "principal",
        subject: "",
        firstName: "Rafal",
        lastName: "Pijet",
        telephone: "600 391 395",
        email: "principal@gmail.com",
        password: "qqq"
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
