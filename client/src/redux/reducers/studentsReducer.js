import {LOAD_ALL_STUDENTS, UPDATE_STUDENT, DELETE_STUDENT, ADD_STUDENT} from "../actions/studentActions";

const initialState = {
    allStudents: []
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
        case DELETE_STUDENT:
            return {...state, allStudents: state.allStudents.filter(student => student.id !== action.id)};
        default:
            return state
    }
};

export default reducer;
