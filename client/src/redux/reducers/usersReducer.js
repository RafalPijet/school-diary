import {
    SET_LOGIN,
    SET_REGISTER,
    SET_USER,
    LOAD_TEACHERS,
    LOAD_PARENTS,
    UPDATE_PARENT,
    DELETE_PARENT,
    UPDATE_PARENT_STUDENT_CLASS_NAME,
    LOAD_USERS_NAME,
    REMOVE_USER_NAME
} from "../actions/usersActions";

const initialState = {
    isLogin: true,
    register: {email: {}, password: {}},
    teachers: [],
    parents: [],
    usersName: [],
    user: {
        _id: "5e9fd27c00fe4800d6ccbc31",
        students: [],
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

                    if (parent.id === action.id) {
                        parent.students = action.studentsList;
                    }
                    return parent;
                })
            };
        case DELETE_PARENT:
            return {...state, parents: state.parents.filter(parent => parent.id !== action.id)};
        case UPDATE_PARENT_STUDENT_CLASS_NAME:
            return {...state, parents: state.parents.map(parent => {

                if (parent.id === action.parentId) {
                    parent.students.map(student => {

                        if (student.id === action.studentId) {
                            student.className = action.className;
                        }
                        return student;
                    })
                }
                return parent;
                })};
        case LOAD_USERS_NAME:
            return {...state, usersName: action.users};
        case REMOVE_USER_NAME:
            return {...state, usersName: state.usersName.filter(user => user.id !== action.id)};
        default:
            return state
    }
};

export default reducer;
