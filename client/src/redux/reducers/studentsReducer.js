import {LOAD_ALL_STUDENTS, UPDATE_STUDENT} from "../actions/studentActions";

const initialState = {
    allStudents: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_STUDENTS:
            return {...state, allStudents: action.students};
        case UPDATE_STUDENT:
            return {...state, allStudents: state.allStudents.map(student => {
                if (student.id === action.student.id) {
                    return action.student;
                } else {
                    return student;
                }
                })};
        default:
            return state
    }
};

export default reducer;
