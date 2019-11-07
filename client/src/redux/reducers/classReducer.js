import {LOAD_CLASS_BY_TEACHER_ID} from "../actions/classActions";

const initialState = {
    teacherAllClass: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CLASS_BY_TEACHER_ID:
            return {...state, teacherAllClass: action.allClass};
        default:
            return state;
    }
};

export default reducer;
