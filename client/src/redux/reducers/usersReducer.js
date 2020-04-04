import {
    SET_LOGIN,
    SET_USER,
    LOAD_TEACHERS,
    LOAD_PARENTS,
    UPDATE_PARENT,
    DELETE_PARENT
} from "../actions/usersActions";

const initialState = {
    isLogin: false,
    teachers: [],
    parents: [],
    user: {
        students: [],
        _id: "5e88438975b10f84cc3767e0",
        id: "6bba8934-a215-4e75-ad28-8e4fb887187c",
        status: "principal",
        subject: "",
        firstName: "Rafal",
        lastName: "Pijet",
        telephone: "600 391 395",
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
