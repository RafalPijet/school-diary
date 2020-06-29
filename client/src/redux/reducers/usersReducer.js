import {
    SET_LOGIN,
    SET_REGISTER,
    SET_USER,
    UPDATE_USER_DATA,
    LOAD_TEACHERS,
    LOAD_PARENTS,
    UPDATE_PARENT,
    DELETE_PARENT,
    UPDATE_PARENT_STUDENT_CLASS_NAME,
    LOAD_USERS_NAME,
    REMOVE_USER_NAME,
    ADD_PARENT,
    ADD_CLASSNAME_TO_STUDENT
} from "../actions/usersActions";

const initialState = {
    isLogin: false,
    register: {email: {}, password: {}},
    teachers: [],
    parents: [],
    usersName: [],
    user: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {...state, isLogin: action.isLogin};
        case SET_REGISTER:
            return {...state, register: {email: action.login.email, password: action.login.password}};
        case SET_USER:
            return {...state, user: action.user};
        case UPDATE_USER_DATA:
            return {
                ...state, user: {
                    ...state.user,
                    firstName: action.data.firstName,
                    lastName: action.data.lastName,
                    email: action.data.email,
                    telephone: action.data.telephone
                }
            };
        case LOAD_TEACHERS:
            return {...state, teachers: action.teachers};
        case LOAD_PARENTS:
            return {...state, parents: action.parents};
        case ADD_PARENT:
            return {...state, parents: [...state.parents, action.parent]};
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
            return {
                ...state, parents: state.parents.map(parent => {

                    if (parent.id === action.parentId) {
                        parent.students.map(student => {

                            if (student.id === action.studentId) {
                                student.className = action.className;
                            }
                            return student;
                        })
                    }
                    return parent;
                })
            };
        case LOAD_USERS_NAME:
            return {...state, usersName: action.users};
        case REMOVE_USER_NAME:
            return {...state, usersName: state.usersName.filter(user => user.id !== action.id)};
        case ADD_CLASSNAME_TO_STUDENT:
            return {
                ...state, user: {
                    ...state.user, students: state.user.students.map(student => {

                        if (student.id === action.studentId) {
                            student.className = action.className
                        }
                        return student;
                    })
                }
            };
        default:
            return state
    }
};

export default reducer;
