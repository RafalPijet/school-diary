import {LOAD_ALL_STUDENTS} from "../actions/studentActions";

const initialState = {
    allStudents: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_STUDENTS:
            return {...state, allStudents: action.students};
        default:
            return state
    }
};

export default reducer;
