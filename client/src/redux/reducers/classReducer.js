import {LOAD_CLASS_BY_TEACHER_ID, SELECT_CLASS, ADD_RATING_TO_STUDENT, LOAD_ALL_CLASSES} from "../actions/classActions";

const initialState = {
    allClasses: [],
    teacherAllClass: [],
    selectedClass: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CLASS_BY_TEACHER_ID:
            return {...state, teacherAllClass: action.allClass};
        case LOAD_ALL_CLASSES:
            return {...state, allClasses: action.allClasses};
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
            break;
        default:
            return state;
    }
};

export default reducer;
