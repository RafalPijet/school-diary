import {LOAD_CLASS_BY_TEACHER_ID, SELECT_CLASS, ADD_RATING_TO_STUDENT} from "../actions/classActions";

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
        case ADD_RATING_TO_STUDENT:
            let selectedStudent = state.selectedClass.students.find(student => student.id === action.rating.studentId);
            selectedStudent.ratings = selectedStudent.ratings.map(rating => {

                if (rating.id === action.rating.id) {
                    return action.rating
                } else {
                    return rating
                }
            });
        default:
            return state;
    }
};

export default reducer;
