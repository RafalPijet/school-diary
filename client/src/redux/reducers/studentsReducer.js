import {
    LOAD_ALL_STUDENTS,
    UPDATE_STUDENT,
    ADD_STUDENT,
    SET_FREE_STUDENTS,
    SET_CLASSES_STUDENTS
} from "../actions/studentActions";

const initialState = {
    allStudents: [],
    freeStudents: [],
    classesStudents: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_STUDENTS:
            return {...state, allStudents: action.students};
        case ADD_STUDENT:
            return {...state, allStudents: [...state.allStudents, action.student]};
        case UPDATE_STUDENT:
            return {...state, allStudents: state.allStudents.map(student => {
                if (student.id === action.student.id) {
                    return action.student;
                } else {
                    return student;
                }
                })};
        case SET_FREE_STUDENTS:
            return {...state, freeStudents: action.students};
        case SET_CLASSES_STUDENTS:
            return {...state, classesStudents: action.students};
        default:
            return state
    }
};

export default reducer;
