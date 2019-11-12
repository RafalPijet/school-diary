import {LOAD_CLASS_BY_TEACHER_ID, SELECT_CLASS} from "../actions/classActions";

const initialState = {
    teacherAllClass: [],
    selectedClass: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CLASS_BY_TEACHER_ID:
            return {...state, teacherAllClass: action.allClass};
        case SELECT_CLASS:
            return {...state, selectedClass: action.diary};
        default:
            return state;
    }
};

export default reducer;
